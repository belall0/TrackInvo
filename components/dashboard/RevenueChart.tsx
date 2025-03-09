import { fetchRevenueByUserId } from '@/data/data';
import { CiCalendar } from 'react-icons/ci';
import { months } from '@/lib/constants';

import RevenueBarChart from '@/components/dashboard/RevenueBarChart';

const RevenueChart = async ({ userId }: { userId: string }) => {
  const revenue = await fetchRevenueByUserId(userId);
  const data = revenue.map((item) => {
    return {
      month: months.get(item.month)!,
      revenue: item.revenue,
    };
  });

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>

      {data.length > 0 ? (
        <>
          <div className="rounded-xl bg-gray-50 p-4">
            <RevenueBarChart data={data} />

            <div className="flex items-center pb-2 pt-6">
              <CiCalendar className="h-5 w-5 text-gray-500" />
              <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex h-40 items-center justify-center">
              <h3 className="text-sm text-gray-500">No revenue data available</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueChart;
