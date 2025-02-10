import Card from '@/components/dashboard/Card';
import {} from '@/lib/definitions';

const CardList = ({
  totalPaidInvoices,
  totalPendingInvoices,
  numberOfInvoices,
  numberOfCustomers,
}: any) => {
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
};

export default CardList;
