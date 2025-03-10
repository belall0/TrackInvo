// @ts-nocheck

import { auth } from '@/auth/auth';
import { Invoice, columns } from '@/components/invoices/InvoicesColumns';
import DataTable from '@/components/invoices/InvoicesTable';
import { fetchInvoicesByUserId } from '@/lib/db/invoices';

interface CustomersProps {
  searchParams?: Promise<{
    search?: string;
  }>;
}
export default async function DemoPage(props: CustomersProps) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';
  const session = await auth();
  const data = await fetchInvoicesByUserId(session?.user?.id!, search);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Invoices</h1>
        <p className="text-gray-600">Here's a list of all of your Invoices. Enjoy!</p>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
