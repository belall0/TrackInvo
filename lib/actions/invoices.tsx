'use server';
import { auth } from '@/auth/auth';
import db from '@/lib/db/prisma';
import { createResponse } from '@/lib/utils';
import { deleteInvoiceById } from '../db/invoices';

export const deleteInvoiceAction = async (prevState: unknown, data: FormData) => {
  // 1. Authenticate the user
  const session = await auth();
  if (!session?.user?.id) {
    return createResponse({
      success: false,
      message: 'You are not authorized to perform this action',
    });
  }
  // 3. get the invoice
  const invoiceId = data.get('invoiceId');
  if (typeof invoiceId !== 'string' || !invoiceId) {
    return createResponse({ success: false, message: 'Invalid invoice ID' });
  }
  const invoice = await db.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: session.user.id,
    },
  });
  if (!invoice) {
    return createResponse({
      success: false,
      message: 'Invoice not found',
    });
  }

  // 4. check if the user has permission to delete the invoice
  if (invoice.userId !== session?.user?.id) {
    return createResponse({
      success: false,
      message: 'You do not have permission to delete this invoice',
    });
  }

  // 4. delete the invoice
  await deleteInvoiceById(session.user.id, invoiceId);
  // 5. return the response
  return createResponse({
    success: true,
    message: 'Invoice deleted successfully',
  });
};
