import { createCustomerSchema } from '@/lib/schemas/customers';
import { z } from 'zod';

export type CreateCustomerValues = z.infer<typeof createCustomerSchema>;
