import db from '@/lib/db/prisma';

export const fetchCustomersCountByUserId = async (userId: string) => {
  const count = await db.customer.count({
    where: {
      userId,
    },
  });

  return count;
};

export const fetchInvoicesCountByUserId = async (userId: string) => {
  const count = await db.invoice.count({
    where: {
      userId,
    },
  });

  return count;
};

export const fetchTotalPaidAmountByUserId = async (userId: string) => {
  const total = await db.invoice.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      status: 'paid',
    },
  });

  const amount = total._sum.amount?.toString() || '0'; // the result from db is decimal, so we need to cover it to string and Handle null/undefined
  const result: number = parseInt(amount);

  return result;
};

export const fetchTotalPendingAmountByUserId = async (userId: string) => {
  const total = await db.invoice.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      status: 'pending',
    },
  });

  const amount = total._sum.amount?.toString() || '0'; // the result from db is decimal, so we need to cover it to string and Handle null/undefined
  const result: number = parseInt(amount);

  return result;
};

export const fetchLatestInvoicesByUserId = async (userId: string) => {
  let invoices = await db.invoice.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      amount: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },

    take: 5,
  });

  // Convert Decimal objects to plain numbers or strings
  const res = invoices.map((invoice) => ({
    ...invoice,
    amount: Math.floor(Number(invoice.amount)),
  }));

  return res;
};

export const fetchRevenueByUserId = async (userId: string) => {
  const revenue = await db.revenue.findMany({
    where: {
      userId,
    },
    select: {
      month: true,
      year: true,
      revenue: true,
    },
  });

  return revenue;
};
