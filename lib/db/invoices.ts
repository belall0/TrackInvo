import db from '@/lib/db/prisma';
export const fetchInvoicesByUserId = async (userId: string, search: string) => {
  // 1. fetch all invoices by userId
  const invoices = await db.invoice.findMany({
    where: {
      userId,
    },

    include: {
      customer: true,
    },
  });

  // 2. filter invoices by customer name, email or phone

  let finalResult = invoices;
  if (search) {
    finalResult = invoices.filter((invoice) => {
      const customer = invoice.customer;
      if (!customer) return false;

      return (
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        (customer.phone?.toLowerCase() || '').includes(search.toLowerCase())
      );
    });
  }
  // 3. return invoices

  const resultsWithRegularNumbers = finalResult.map((invoice) => ({
    ...invoice,
    amount: Number(invoice.amount),
  }));

  return resultsWithRegularNumbers;
};

export const deleteInvoiceById = async (id: string) => {
  await db.invoice.delete({
    where: {
      id,
    },
  });
};
