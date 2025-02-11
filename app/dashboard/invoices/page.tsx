import { Suspense } from 'react';

import Search from '@/components/search';
import Table from '@/components/invoices/table';
import { CreateInvoice } from '@/components/invoices/buttons';
import { InvoicesTableSkeleton } from '@/components/Skeletons';

const Invoices = async (prob: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await prob.searchParams;
  const query = searchParams.query || '';
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
};

export default Invoices;
