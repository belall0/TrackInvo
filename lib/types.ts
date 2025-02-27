export type { User, Customer, Invoice, Revenue } from '@prisma/client';
export { InvoiceStatus } from '@prisma/client';

export interface CustomersPageByUserId {
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
