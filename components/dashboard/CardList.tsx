import Card from '@/components/dashboard/Card';
import {
  fetchCustomersCountByUserId,
  fetchInvoicesCountByUserId,
  fetchTotalPaidAmountByUserId,
  fetchTotalPendingAmountByUserId,
} from '@/data/data';
import { formatCurrency } from '@/lib/utils';

const CardList = async ({ userId }: { userId?: string }) => {
  const numberOfCustomers = await fetchCustomersCountByUserId(userId!);
  const numberOfInvoices = await fetchInvoicesCountByUserId(userId!);
  const totalPaidInvoices = await fetchTotalPaidAmountByUserId(userId!);
  const totalPendingInvoices = await fetchTotalPendingAmountByUserId(userId!);

  return (
    <>
      <Card title="Collected" value={formatCurrency(totalPaidInvoices)} type="collected" />
      <Card title="Pending" value={formatCurrency(totalPendingInvoices)} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  );
};

export default CardList;
