import { createCustomerSchema, editCustomerSchema } from '@/lib/schemas/customers';
import { z } from 'zod';

export type CreateCustomerValues = z.infer<typeof createCustomerSchema>;
export type EditCustomerValues = z.infer<typeof editCustomerSchema>;
