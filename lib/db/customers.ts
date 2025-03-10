// @ts-nocheck
import db from '@/lib/db/prisma';

export const fetchCustomers = async (userId: string, search: string): Promise<any[]> => {
  const customers = await db.$queryRaw`
    SELECT customers.id,
          customers.name,
          customers.email,
          customers.phone,
          customers.image,
          count(invoices.id) AS total_invoices,
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
    LEFT JOIN invoices ON customers.id = invoices.customer_id
    WHERE customers.user_id = ${userId}
    AND (
      customers.name ILIKE ${`%${search}%`} OR
      customers.email ILIKE ${`%${search}%`} OR
      customers.phone ILIKE ${`%${search}%`}
    )
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

export const getCustomerByEmail = async (userId: string, email: string) => {
  const customer = await db.customer.findMany({
    where: {
      userId,
      email,
    },
  });

  return customer;
};

export const getCustomerById = async (userId: string, customerId: string) => {
  const customer = await db.customer.findFirst({
    where: {
      userId,
      id: customerId,
    },
  });

  return customer;
};

export const getCustomerData = async (userId: string, customerId: string) => {
  const customers = await db.customer.findUnique({
    where: {
      id: customerId,
      userId,
    },
    include: {
      invoices: true,
    },
  });

  return customers;
};
