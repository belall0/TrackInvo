import Form from '@/components/invoices/CreateForm';
import Breadcrumbs from '@/components/invoices/breadcrumbs';
import { fetchCustomers } from '@/lib/data';

const CreateInvoice = async () => {
  const customers = await fetchCustomers();

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

      <Form customers={customers} />
    </main>
  );
};

export default CreateInvoice;
