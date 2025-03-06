import { auth } from '@/auth/auth';
import { getCustomerData } from '@/data/data';
import CustomerInfo from '@/components/CustomerProfile/CustomerInfo';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomerStats from '@/components/CustomerProfile/CustomerStats';
import { CustomerProfileData } from '@/lib/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const customerId = (await params).id;
  const session = await auth();
  // @ts-ignore
  const customer: CustomerProfileData = await getCustomerData(session?.user?.id!, customerId);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div>
      <CustomerInfo
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
              <InvoiceTable invoices={customer.invoices} />
            </TabsContent>

            <TabsContent value="paid">
              <InvoiceTable invoices={customer.invoices.filter((invoice) => invoice.status === 'paid')} />
            </TabsContent>

            <TabsContent value="pending">
              <InvoiceTable invoices={customer.invoices.filter((invoice) => invoice.status === 'pending')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

function InvoiceTable({ invoices }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                <span className="text-xs">{invoice.id.substring(0, 8)}...</span>
              </TableCell>
              <TableCell>{formatDate(invoice.createdAt)}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    invoice.status === 'paid' && 'bg-green-100 text-green-800',
                    invoice.status === 'pending' && 'bg-yellow-100 text-yellow-800',
                  )}>
                  {invoice.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
