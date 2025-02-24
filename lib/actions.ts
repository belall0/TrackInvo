'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { loginSchema, LoginValues, SignupValues, signupSchema } from '@/lib/schema';
import { createResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/data/user';

import { signIn } from '@/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';

interface Response<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export const signupAction = async (prevState: any, data: FormData | SignupValues) => {
  // 1. Validate the form data
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = signupSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
  } else {
    validatedFields = signupSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return createResponse({
      success: false,
      message: 'Invalid fields. Please check your input.',
    });
  }

  // 2. check if the user already exists
  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (user) {
    return createResponse({
      success: false,
      message: 'An account with this email already exists',
    });
  }

  // 3. Hash the password
  const { name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create the user
  try {
    await createUser({ name, email, password: hashedPassword });
    return createResponse({
      success: true,
      message: 'Account created successfully',
    });

    // redirect to the login page
  } catch (error) {
    return createResponse({
      success: false,
      message: 'An unexpected error occurred during signup, please try again',
    });
  }
};

export const loginAction = async (prevState: any, data: FormData | LoginValues) => {
  // 1. Validate the form data
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = loginSchema.safeParse({
      email: data.get('email'),
      password: data.get('password'),
    });
  } else {
    validatedFields = loginSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return createResponse({
      success: false,
      message: 'Invalid fields. Please check your input.',
    });
  }

  // 2. Check if the user exists
  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return createResponse({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // 3. Compare the password
  const passwordMatch = await bcrypt.compare(password, user.password!);
  if (!passwordMatch) {
    return createResponse({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // 4. Sign the user in
  await signIn('credentials', {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT, // redirect to the home page if the user is authenticated
  });
};

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };

  message?: string | null;
};

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Please enter an amount greater than $0.',
  }),
  status: z.enum(['paid', 'pending'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true });

const createInvoiceAction = async (prevState: State, formData: FormData) => {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
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
