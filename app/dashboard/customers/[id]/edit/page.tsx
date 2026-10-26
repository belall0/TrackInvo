import { redirect, notFound } from 'next/navigation';

import { auth } from '@/auth/auth';

import { getCustomerById } from '@/lib/db/customers';

import EditCustomer from '@/components/customers/EditCustomer';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const customer = await getCustomerById(session.user.id, id);
  if (!customer) notFound();
  const defaultValues = {
    customerId: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone ?? '',
  };

  return <EditCustomer defaultValues={defaultValues} />;
};

export default page;
