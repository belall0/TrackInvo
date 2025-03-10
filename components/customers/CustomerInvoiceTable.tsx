// @ts-nocheck
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const CustomerInvoiceTable = ({ invoices }) => {
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
              <TableCell className="font-medium">{invoice.id}</TableCell>
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
};

export default CustomerInvoiceTable;
