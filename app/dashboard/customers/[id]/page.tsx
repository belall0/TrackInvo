import { auth } from '@/auth/auth';
import { getCustomerData } from '@/data/data';
import CustomerInfo from '@/components/CustomerProfile/CustomerInfo';
import { formatDate } from '@/lib/utils';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const customerId = (await params).id;
  const session = await auth();
  const customer = await getCustomerData(session?.user?.id!, customerId);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div>
      <CustomerInfo
        name={customer.name}
        email={customer.email}
        phone={customer.phone ?? ''}
        image={customer.image ?? ''}
        createdAt={formatDate(customer.createdAt.toString()) ?? ''}
      />
    </div>
  );
};

export default page;
