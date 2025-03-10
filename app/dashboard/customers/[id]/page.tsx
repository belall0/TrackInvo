// @ts-nocheck
import { auth } from '@/auth/auth';

import { getCustomerData } from '@/lib/db/customers';
import CustomerInfo from '@/components/customers/CustomerInfo';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomerStats from '@/components/customers/CustomerStats';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CustomerInvoiceTable from '@/components/customers/CustomerInvoiceTable';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const customerId = (await params).id;
  const session = await auth();
  const customer: CustomerProfileData = await getCustomerData(session?.user?.id!, customerId);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div>
      <CustomerInfo
        customerId={customerId}
        name={customer.name}
        email={customer.email}
        phone={customer.phone ?? ''}
        image={customer.image ?? ''}
        createdAt={formatDate(customer.createdAt.toString()) ?? ''}
      />

      <CustomerStats customer={customer} />

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>History of customer invoices</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <CustomerInvoiceTable invoices={customer.invoices} />
            </TabsContent>

            <TabsContent value="paid">
              <CustomerInvoiceTable invoices={customer.invoices.filter((invoice) => invoice.status === 'paid')} />
            </TabsContent>

            <TabsContent value="pending">
              <CustomerInvoiceTable invoices={customer.invoices.filter((invoice) => invoice.status === 'pending')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
