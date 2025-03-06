export type { User, Customer, Invoice, Revenue } from '@prisma/client';
export { InvoiceStatus } from '@prisma/client';

export interface CustomersData {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  total_invoices: number;
  paid_invoices: number;
  pending_invoices: number;
  total_paid: number;
  total_pending: number;
  total_revenue: number;
}

export interface CustomerProfileData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  invoices: {
    id: string;
    userId: string;
    customerId: string;
    amount: number;
    status: 'paid' | 'pending';
    createdAt: Date;
    updatedAt: Date;
  }[];
}
