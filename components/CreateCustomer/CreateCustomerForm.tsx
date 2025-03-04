'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';

import { createCustomerAction } from '@/lib/actions';
import { createCustomerSchema, CreateCustomerValues } from '@/lib/schema';

import { toast } from 'react-toastify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormFieldConfig {
  name: keyof CreateCustomerValues;
  label: string;
  type: string;
  placeholder: string;
}

const formFields: FormFieldConfig[] = [
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

const CreateCustomerForm = () => {
  const [data, action] = useActionState(createCustomerAction, undefined);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<CreateCustomerValues>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
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
            <Input placeholder={placeholder} {...field} type={type} disabled={isPending} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="w-[480px] p-20 sm:w-[640px] md:w-[800px]">
      <CardHeader>
        <CardTitle className="mb-2 text-2xl font-bold text-gray-800">Create a New Customer Account</CardTitle>
        <CardDescription className="text-sm leading-relaxed text-gray-600">
          Please fill out the form below to create a new customer account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFields.map((field) => renderFormFields(field, field.name))}

            <Button type="submit" className="w-full" disabled={isPending}>
              Create a New Customer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCustomerForm;
