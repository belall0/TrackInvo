// TODO: Add Error Handling
// TODO: ADD COMPREHENSIVE TYPES
// TODO: ADD DOCS

import db from '@/data/db';
import { CustomersPageByUserId } from '@/lib/types';
import { Prisma } from '@prisma/client';

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await db.user.create({
    data: user,
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
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

export const fetchCustomersPageByUserId = async (userId: string): Promise<CustomersPageByUserId[]> => {
  const customers: CustomersPageByUserId[] = await db.$queryRaw`
    SELECT customers.id,
          customers.name,
          customers.email,
          customers.phone,
          customers.image,
          count(*) AS total_invoices,
          SUM(CASE
                  WHEN invoices.status = 'paid' THEN 1
                  ELSE 0
              END) AS paid_invoices,
          SUM(CASE
                  WHEN invoices.status = 'pending' THEN 1
                  ELSE 0
              END) AS pending_invoices,
          SUM(CASE
                  WHEN invoices.status = 'paid' THEN invoices.amount
                  ELSE 0
              END) AS total_paid,
          SUM(CASE
                  WHEN invoices.status = 'pending' THEN invoices.amount
                  ELSE 0
              END) AS total_pending,
          SUM(invoices.amount) AS total_revenue
    FROM customers
    INNER JOIN invoices ON customers.id = invoices.customer_id
    WHERE invoices.user_id = ${userId}
    GROUP BY customers.id
  `;

  // prisma returns bigInts, so we need to convert them to regular js numbers
  const resultsWithRegularNumbers = customers.map((customer) => ({
    ...customer,
    total_invoices: Number(customer.total_invoices),
    paid_invoices: Number(customer.paid_invoices),
    pending_invoices: Number(customer.pending_invoices),
    total_paid: Number(customer.total_paid),
    total_pending: Number(customer.total_pending),
    total_revenue: Number(customer.total_revenue),
  }));

  return resultsWithRegularNumbers;
};

const testQueries = async () => {
  // await fetchCustomersPageByUserId('cm7j4xg4a0000sgw0brhm4jw9');
};

testQueries();
