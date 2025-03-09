'use server';

import { auth } from '@/auth/auth';
import db from '@/lib/db/prisma';

import { createResponse } from '@/lib/utils';
import { CreateCustomerValues } from '@/lib/types/customers';
import { createCustomerSchema, editCustomerSchema } from '@/lib/schemas/customers';
import { getCustomerByEmail } from '@/lib/db/customers';

export const createCustomerAction = async (prevState: any, data: FormData | CreateCustomerValues) => {
  const session = await auth();

  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = createCustomerSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
    });
  } else {
    validatedFields = createCustomerSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return createResponse({
      success: false,
      message: 'Invalid fields. Please check your input.',
    });
  }

  const customerData: CreateCustomerValues = validatedFields.data;
  const customer = await getCustomerByEmail(session?.user?.id!, customerData.email);
  if (customer.length > 0) {
    return createResponse({
      success: false,
      message: 'A customer with this email already exists',
    });
  }

  await db.customer.create({
    data: {
      ...customerData,
      userId: session?.user?.id!,
      image: '/avatars/male1.png', // TODO: randomize the avatar
    },
  });

  return createResponse({
    success: true,
    message: 'Customer created successfully',
  });
};

export const editCustomerAction = async (prevState: any, data: FormData) => {
  // 1. Authenticate the user
  const session = await auth();

  // 2. Validate the form data
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = editCustomerSchema.safeParse({
      customerId: data.get('customerId'),
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
    });
  } else {
    validatedFields = editCustomerSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return createResponse({
      success: false,
      message: 'Invalid fields. Please check your input.',
    });
  }

  // 3. Make sure the user owns the customer
  const customer = await db.customer.findUnique({
    where: {
      id: validatedFields.data.customerId,
      userId: session?.user?.id,
    },
  });

  if (!customer) {
    return createResponse({
      success: false,
      message: 'Customer not found',
    });
  }

  // 4. make sure the email isn't already taken
  const existingCustomer = await getCustomerByEmail(session?.user?.id!, validatedFields.data.email);
  if (existingCustomer.length > 0) {
    return createResponse({
      success: false,
      message: 'A customer with this email already exists',
    });
  }

  // 5. Update the customer data
  await db.customer.update({
    where: {
      id: validatedFields.data.customerId,
    },
    data: {
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      phone: validatedFields.data.phone,
    },
  });

  // 6. Return the response
  return createResponse({
    success: true,
    message: 'Customer updated successfully',
  });
};

export const deleteCustomerAction = async (prevState: any, data: FormData) => {
  const session = await auth();
  const customerId = data.get('customerId') as string;

  const customer = await db.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    return createResponse({
      success: false,
      message: 'Customer not found',
    });
  }

  if (customer.userId !== session?.user?.id) {
    return createResponse({
      success: false,
      message: 'You do not have permission to delete this customer',
    });
  }

  await db.customer.delete({
    where: {
      id: customerId,
    },
  });

  return createResponse({
    success: true,
    message: 'Customer deleted successfully',
  });
};
