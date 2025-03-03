import { columns } from '@/components/customers/columns';
import { DataTable } from '@/components/customers/data-table';
import { auth } from '@/auth/auth';
import { fetchCustomersPageByUserId } from '@/data/data';

export default async function DemoPage() {
  const session = await auth();
  const data = await fetchCustomersPageByUserId(session?.user?.id!);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Customers</h1>
        <p className="text-gray-600">
          Here's a list of all of your customers. You can do a lot of things with this data, try it out!
        </p>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
