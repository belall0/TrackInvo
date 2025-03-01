'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { loginSchema, LoginValues, SignupValues, signupSchema } from '@/lib/schema';
import { createResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/data/data';

import { signIn } from '@/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';

interface Response<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export const signupAction = async (prevState: any, data: FormData | SignupValues) => {
  // 1. Validate the form data
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = signupSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
  } else {
    validatedFields = signupSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return createResponse({
      success: false,
      message: 'Invalid fields. Please check your input.',
    });
  }

  // 2. check if the user already exists
  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (user) {
    return createResponse({
      success: false,
      message: 'An account with this email already exists',
    });
  }

  // 3. Hash the password
  const { name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create the user
  try {
    await createUser({ name, email, passwordHash: hashedPassword });
    return createResponse({
      success: true,
      message: 'Account created successfully',
    });

    // redirect to the login page
  } catch (error) {
    return createResponse({
      success: false,
      message: 'An unexpected error occurred during signup, please try again',
    });
  }
};

export const loginAction = async (prevState: any, data: FormData | LoginValues) => {
  // 1. Validate the form data
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = loginSchema.safeParse({
      email: data.get('email'),
      password: data.get('password'),
    });
  } else {
    validatedFields = loginSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return createResponse({
      success: false,
      message: 'Invalid fields. Please check your input.',
    });
  }

  // 2. Check if the user exists
  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return createResponse({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // 3. Compare the password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return createResponse({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // 4. Sign the user in
  await signIn('credentials', {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT, // redirect to the home page if the user is authenticated
  });
};
