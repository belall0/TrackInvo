import Image from 'next/image';
import clsx from 'clsx';
import { HiArrowPath } from 'react-icons/hi2';

import { formatCurrency } from '@/lib/utils';
import { fetchLatestInvoicesByUserId } from '@/lib/db/user';

const LatestInvoices = async ({ userId }: { userId: string }) => {
  const latestInvoices = await fetchLatestInvoicesByUserId(userId);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Latest Invoices</h2>

      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {latestInvoices.length > 0 ? (
          <div className="bg-white px-6">
            {latestInvoices.map((invoice, i) => {
              return (
                <div
                  key={invoice.id}
                  className={clsx('flex flex-row items-center justify-between py-4', {
                    'border-t': i !== 0,
                  })}>
                  <div className="flex items-center">
                    <Image
                      src={invoice.customer.image!}
                      alt={`${invoice.customer.name!}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">{invoice.customer.name}</p>

                      <p className="hidden text-sm text-gray-500 sm:block">{invoice.customer.email}</p>
                    </div>
                  </div>

                  <p className={`truncate text-sm font-medium md:text-base`}>{formatCurrency(invoice.amount)}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center">
            <p className="text-sm text-gray-500">No invoices found</p>
          </div>
        )}

        <div className="flex items-center pb-2 pt-6">
          <HiArrowPath className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
};

export default LatestInvoices;
