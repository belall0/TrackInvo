import db from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { users, customers, invoices, revenues } from '@/lib/db/seed-data';

const seedUsers = async (users: Prisma.UserCreateManyInput[]) => {
  await db.user.createMany({ data: users });
};

const seedCustomers = async (customers: Prisma.CustomerCreateManyInput[]) => {
  await db.customer.createMany({
    data: customers,
  });
};

const seedInvoices = async (invoices: Prisma.InvoiceCreateManyInput[]) => {
  await db.invoice.createMany({
    data: invoices,
  });
};

const seedRevenues = async (revenues: Prisma.RevenueCreateManyInput[]) => {
  await db.revenue.createMany({
    data: revenues,
  });
};

const clearData = async () => {
  await db.user.deleteMany();
  await db.customer.deleteMany();
  await db.invoice.deleteMany();
  await db.revenue.deleteMany();
};

const seed = async () => {
  await clearData();

  await seedUsers(users);
  await seedCustomers(customers);
  await seedInvoices(invoices);
  await seedRevenues(revenues);
};

seed();
