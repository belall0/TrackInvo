import { columns } from '@/components/customers/columns';
import { DataTable } from '@/components/customers/data-table';
import { auth } from '@/auth/auth';
import { fetchCustomers, fetchTotalCustomersPages } from '@/data/data';

interface CustomersProps {
  searchParams?: Promise<{
    search?: string;
    page?: number;
  }>;
}

const Customers = async (props: CustomersProps) => {
  // 1. Get the search params from the props (if any) to filter the data
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';
  const page = searchParams?.page || 1;

  // 2. get the user info before fetching the data
  const session = await auth();

  // 3. Fetch the data based on the user id and the search params (if any)
  const data = await fetchCustomers(session?.user?.id!, search, page);
  const totalCustomersPages = await fetchTotalCustomersPages(session?.user?.id!, search);

  // 4. pass the data to the client-side component to render the UI
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Customers</h1>
        <p className="text-gray-600">
          Here's a list of all of your customers. You can do a lot of things with this data, try it out!
        </p>
      </div>

      <DataTable columns={columns} data={data} totalPages={totalCustomersPages} />
    </div>
  );
};

export default Customers;
