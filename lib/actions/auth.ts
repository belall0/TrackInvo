'use server';

import bcrypt from 'bcryptjs';
import { loginSchema, signupSchema } from '@/lib/schemas/auth';
import { LoginFormData, SignupFormData } from '@/lib/types/auth';
import { createResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/lib/db/auth';
import { signIn } from '@/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';

export const signup = async (prevState: any, data: FormData | SignupFormData) => {
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

export const login = async (prevState: any, data: FormData | LoginFormData) => {
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
