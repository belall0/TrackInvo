import db from '@/data/db';
import { Prisma, InvoiceStatus } from '@prisma/client';
import { users, customers, invoices } from '@/data/placeholder-data';

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

const clearData = async () => {
  await db.user.deleteMany();
  await db.customer.deleteMany();
  await db.invoice.deleteMany();
};

const seed = async () => {
  await clearData();

  await seedUsers(users);
  await seedCustomers(customers);
  await seedInvoices(invoices);
};

seed();
