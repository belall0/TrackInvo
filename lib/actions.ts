'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'pending']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true });

const createInvoiceAction = async (formData: FormData) => {
  const data = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  data.amount = data.amount * 100; // Convert to cents
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${data.customerId}, ${data.amount}, ${data.status}, ${date})
`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

const updateInvoice = async (formData: FormData) => {
  const { id, customerId, amount, status } = UpdateInvoice.parse({
    id: formData.get('id'),
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

const deleteForm = async (id: string) => {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  revalidatePath('/dashboard/invoices');
};

export { createInvoiceAction, updateInvoice, deleteForm };
