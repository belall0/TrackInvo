import CustomersTable from '@/components/CustomersTable';
import { cTable } from '@/data/placeholder-data';

export default async function Page() {
  const customers = cTable;

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
