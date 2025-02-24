import Card from '@/components/dashboard/Card';
import {
  fetchCustomersCountByUserId,
  fetchInvoicesCountByUserId,
  fetchTotalPaidAmountByUserId,
  fetchTotalPendingAmountByUserId,
} from '@/data/data';

const CardList = async ({ userId }: { userId?: string }) => {
  const numberOfCustomers = await fetchCustomersCountByUserId(userId!);
  const numberOfInvoices = await fetchInvoicesCountByUserId(userId!);
  const totalPaidInvoices = await fetchTotalPaidAmountByUserId(userId!);
  const totalPendingInvoices = await fetchTotalPendingAmountByUserId(userId!);

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  );
};

export default CardList;
