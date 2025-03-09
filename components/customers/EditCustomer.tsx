// @ts-nocheck
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { toast } from 'react-toastify';

import { EditCustomerValues } from '@/lib/types/customers';
import { editCustomerAction } from '@/lib/actions/customers';
import { editCustomerSchema } from '@/lib/schemas/customers';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormFieldConfig {
  name: keyof EditCustomerValues;
  label: string;
  type: string;
  placeholder: string;
}

const formFields: FormFieldConfig[] = [
  {
    name: 'customerId',
    label: 'Customer ID',
    type: 'text',
    placeholder: 'cm7nnisry000bc4w09w624gs3',
  },

  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Belal Muhammad',
  },

  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'belal@example.com',
  },

  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: '01033336858',
  },
];

interface UpdateCustomerProps {
  defaultValues: EditCustomerValues;
}

const CreateCustomerForm = ({ defaultValues }: UpdateCustomerProps) => {
  const [data, action] = useActionState(editCustomerAction, undefined);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<EditCustomerValues>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues,
  });

  // Handle actiona status
  useEffect(() => {
    if (data?.success === true) {
      toast.success(data.message);
      router.push('/dashboard/customers'); // Redirect to customers page
    } else if (data?.success === false) {
      // Handle error case if needed
      toast.error(data.message);
    }
  }, [data]);

  const onSubmit = (values: CreateCustomerValues) => {
    startTransition(() => {
      action(values);
    });
  };

  const renderFormFields = ({ name, type, label, placeholder }: FormFieldConfig, key: string) => (
    <FormField
      key={key}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} disabled={isPending || name === 'customerId'} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="w-[480px] p-20 sm:w-[640px] md:w-[800px]">
      <CardHeader>
        <CardTitle className="mb-2 text-2xl font-bold text-gray-800">Edit Customer Information</CardTitle>

        <CardDescription className="text-sm leading-relaxed text-gray-600">
          Edit customer information by filling out the form below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFields.map((field) => renderFormFields(field, field.name))}

            <Button type="submit" className="w-full" disabled={isPending}>
              Edit Customer Information
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCustomerForm;
