import { auth } from '@/auth/auth';

import CardList from '@/components/dashboard/CardList';
import RevenueChart from '@/components/dashboard/RevenueChart';
import LatestInvoices from '@/components/dashboard/LatestInvoices';

const Dashboard = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return;
  }

  const userId = session.user.id;

  return (
    <main className="h-full">
      <h1 className="mb-4 text-xl font-bold md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardList userId={userId} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart userId={userId} />
        <LatestInvoices userId={userId} />
      </div>
    </main>
  );
};

export default Dashboard;
