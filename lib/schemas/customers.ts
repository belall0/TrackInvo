import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email format').trim().toLowerCase(),
  phone: z.string().min(1, 'Phone number is required').max(20, 'Phone number cannot exceed 20 characters'),
});

export const editCustomerSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email format').trim().toLowerCase(),
  phone: z.string().min(1, 'Phone number is required').max(20, 'Phone number cannot exceed 20 characters'),
});
