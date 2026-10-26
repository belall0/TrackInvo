import assert from 'node:assert/strict';
import { beforeEach, mock, test } from 'node:test';

let session: { user: { id?: string } } | null = null;
const db = {
  customer: {
    findMany: mock.fn(async () => [{ id: 'customer-1' }]),
    findUnique: mock.fn<(query: unknown) => Promise<{ id: string; userId: string } | null>>(async () => ({ id: 'customer-1', userId: 'owner' })),
    create: mock.fn<(query: unknown) => Promise<object>>(async () => ({})),
    update: mock.fn<(query: unknown) => Promise<object>>(async () => ({})),
    delete: mock.fn<(query: unknown) => Promise<object>>(async () => ({})),
  },
  invoice: {
    findUnique: mock.fn<(query: unknown) => Promise<{ id: string; userId: string } | null>>(async () => ({ id: 'invoice-1', userId: 'owner' })),
    delete: mock.fn<(query: unknown) => Promise<object>>(async () => ({})),
  },
  user: {
    findUnique: mock.fn(async () => null),
    create: mock.fn<(query: unknown) => Promise<object>>(async () => ({})),
  },
};

mock.module('../auth/auth.ts', {
  namedExports: { auth: async () => session, signIn: mock.fn() },
});
mock.module('../lib/db/prisma.ts', { defaultExport: db });

const { createCustomerAction, editCustomerAction, deleteCustomerAction } = await import('../lib/actions/customers');
const { deleteInvoiceAction } = await import('../lib/actions/invoices');
const { signup } = await import('../lib/actions/auth');
const { signupSchema } = await import('../lib/schemas/auth');

const customer = { customerId: 'customer-1', name: 'Test Customer', email: 'test@example.com', phone: '01234567890' };

beforeEach(() => {
  session = null;
  for (const model of Object.values(db)) {
    for (const method of Object.values(model)) method.mock.resetCalls();
  }
});

test('customer and invoice actions reject missing identity before any database access', async () => {
  for (const identity of [null, { user: {} }]) {
    session = identity;
    const customerForm = new FormData();
    customerForm.set('customerId', 'customer-1');
    const invoiceForm = new FormData();
    invoiceForm.set('invoiceId', 'invoice-1');
    for (const result of [
      await createCustomerAction(undefined, customer),
      await editCustomerAction(undefined, customer),
      await deleteCustomerAction(undefined, customerForm),
      await deleteInvoiceAction(undefined, invoiceForm),
    ]) assert.equal(result.success, false);
  }
  for (const model of Object.values(db)) {
    for (const method of Object.values(model)) assert.equal(method.mock.callCount(), 0);
  }
});

test('an owner can edit a customer without changing its email and the write remains owner-scoped', async () => {
  session = { user: { id: 'owner' } };
  const result = await editCustomerAction(undefined, customer);
  assert.equal(result.success, true);
  assert.deepEqual(db.customer.update.mock.calls[0].arguments[0], {
    where: { id: 'customer-1', userId: 'owner' },
    data: { name: customer.name, email: customer.email, phone: customer.phone },
  });
});

test('another user cannot delete an invoice or customer', async () => {
  session = { user: { id: 'other-user' } };
  const customerForm = new FormData();
  customerForm.set('customerId', 'customer-1');
  const invoiceForm = new FormData();
  invoiceForm.set('invoiceId', 'invoice-1');
  assert.equal((await deleteCustomerAction(undefined, customerForm)).success, false);
  assert.equal((await deleteInvoiceAction(undefined, invoiceForm)).success, false);
  assert.equal(db.customer.delete.mock.callCount(), 0);
  assert.equal(db.invoice.delete.mock.callCount(), 0);
});

test('a customer outside the ownership filter cannot be edited', async () => {
  session = { user: { id: 'other-user' } };
  db.customer.findUnique.mock.mockImplementationOnce(async () => null);
  assert.equal((await editCustomerAction(undefined, customer)).success, false);
  assert.deepEqual(db.customer.findUnique.mock.calls[0].arguments[0], { where: { id: 'customer-1', userId: 'other-user' } });
  assert.equal(db.customer.update.mock.callCount(), 0);
});

test('owners can delete their own invoices and the final write includes ownership', async () => {
  session = { user: { id: 'owner' } };
  const form = new FormData();
  form.set('invoiceId', 'invoice-1');
  assert.equal((await deleteInvoiceAction(undefined, form)).success, true);
  assert.deepEqual(db.invoice.delete.mock.calls[0].arguments[0], { where: { id: 'invoice-1', userId: 'owner' } });
});

test('signup FormData includes password confirmation and stores a hash', async () => {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: 'Test User', email: 'test@example.com', password: 'password123', confirmPassword: 'password123' })) form.set(key, value);
  assert.equal((await signup(undefined, form)).success, true);
  const query = db.user.create.mock.calls[0].arguments[0] as { data: { passwordHash: string; password?: string } };
  assert.match(query.data.passwordHash, /^\$2[aby]\$/);
  assert.equal(query.data.password, undefined);
});

test('signup rejects mismatched confirmation and passwords bcrypt would truncate', () => {
  const base = { name: 'Test User', email: 'test@example.com', password: 'password123', confirmPassword: 'different' };
  assert.equal(signupSchema.safeParse(base).success, false);
  const password = 'é'.repeat(37);
  assert.equal(signupSchema.safeParse({ ...base, password, confirmPassword: password }).success, false);
});
