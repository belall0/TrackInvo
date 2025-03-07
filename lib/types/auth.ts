import { loginSchema, signupSchema } from '@/lib/schemas/auth';
import { z } from 'zod';

// Infer types from Zod schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export interface Response<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
