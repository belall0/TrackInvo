import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/lib/data';
import CardList from '@/components/dashboard/CardList';
import RevenueChart from '@/components/dashboard/RevenueChart';
import LatestInvoices from '@/components/dashboard/LatestInvoices';

const DashBoard = async () => {
  const [
    revenue,
    latestInvoices,
    {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    },
  ] = await Promise.all([
    await fetchRevenue(),
    await fetchLatestInvoices(),
    await fetchCardData(),
  ]);

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardList
          numberOfCustomers={numberOfCustomers}
          numberOfInvoices={numberOfInvoices}
          totalPaidInvoices={totalPaidInvoices}
          totalPendingInvoices={totalPendingInvoices}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
};

export default DashBoard;
