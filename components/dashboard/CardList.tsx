import {
  fetchCustomersCountByUserId,
  fetchInvoicesCountByUserId,
  fetchTotalPaidAmountByUserId,
  fetchTotalPendingAmountByUserId,
} from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import SummaryCard from '@/components/common/SummaryCard';
import { HiOutlineBanknotes, HiOutlineClock, HiOutlineUserGroup, HiOutlineInbox } from 'react-icons/hi2';

interface CardListProps {
  userId: string;
}
const CardList = async ({ userId }: CardListProps) => {
  const numberOfCustomers = await fetchCustomersCountByUserId(userId);
  const numberOfInvoices = await fetchInvoicesCountByUserId(userId);
  const totalPaidInvoices = await fetchTotalPaidAmountByUserId(userId);
  const totalPendingInvoices = await fetchTotalPendingAmountByUserId(userId);

  return (
    <>
      <SummaryCard title="Collected" value={formatCurrency(totalPaidInvoices)} Icon={HiOutlineBanknotes} />
      <SummaryCard title="Pending" value={formatCurrency(totalPendingInvoices)} Icon={HiOutlineClock} />
      <SummaryCard title="Total Invoices" value={numberOfInvoices} Icon={HiOutlineUserGroup} />
      <SummaryCard title="Total Customers" value={numberOfCustomers} Icon={HiOutlineInbox} />
    </>
  );
};

export default CardList;
