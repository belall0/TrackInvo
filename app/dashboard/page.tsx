import { Suspense } from 'react';
import { auth } from '@/auth/auth';

// UI Components
import CardList from '@/components/dashboard/CardList';
import RevenueChart from '@/components/dashboard/RevenueChart';
import LatestInvoices from '@/components/dashboard/LatestInvoices';
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '@/components/Skeletons';

const DashBoard = async () => {
  const session = await auth();

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardList userId={session?.user?.id} />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart userId={session?.user?.id} />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices userId={session?.user?.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default DashBoard;
