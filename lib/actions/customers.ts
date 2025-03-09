'use server';

import { auth } from '@/auth/auth';
import db from '@/lib/db/prisma';

import { createResponse } from '@/lib/utils';
import { CreateCustomerValues } from '@/lib/types/customers';
import { createCustomerSchema } from '@/lib/schemas/customers';
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
