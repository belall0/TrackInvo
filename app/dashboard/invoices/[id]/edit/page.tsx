import EditInvoiceForm from '@/components/invoices/EditInvoiceForm';
import Breadcrumbs from '@/components/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/lib/data';

const UpdateInvoice = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },

          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
};

export default UpdateInvoice;
