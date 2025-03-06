import React from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerProfileData } from '@/lib/types';

const CustomerStats = ({ customer }: { customer: CustomerProfileData }) => {
  const totalInvoices = customer.invoices.length;
  const paidInvoices = customer.invoices.filter((invoice) => invoice.status === 'paid').length;
  const pendingInvoices = customer.invoices.filter((invoice) => invoice.status === 'pending').length;
  const totalAmount = customer.invoices.reduce((sum, invoice) => sum + Number.parseInt(invoice.amount.toString()), 0);
  const paidAmount = customer.invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + Number.parseInt(invoice.amount.toString()), 0);
  const pendingAmount = customer.invoices
    .filter((invoice) => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + Number.parseInt(invoice.amount.toString()), 0);

  return (
    <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Customer ID</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono text-xs">{customer.id}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Last updated: {formatDate(customer.updatedAt.toString())}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvoices}</div>
          <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(totalAmount)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paidInvoices}</div>
          <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(paidAmount)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingInvoices}</div>
          <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(pendingAmount)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerStats;
