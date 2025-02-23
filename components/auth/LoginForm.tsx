'use client';

import { useActionState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginValues } from '@/lib/schema';
import { LoginAction } from '@/lib/actions';

// UI Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

// Type Definitions for form fields
interface FormFieldConfig {
  name: keyof LoginValues;
  label: string;
  type: string;
  placeholder: string;
}

const formFields: FormFieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'belal@example.com',
  },

  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '******',
  },
];

const LoginForm = () => {
  // 1. useActionState hook to get the response from the LoginAction
  const [data, action] = useActionState(LoginAction, undefined);
  // 2. useTransition hook to handle the pending state of the form
  const [isPending, startTransition] = useTransition();

  // 3. useForm hook to handle the form state
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 4. onSubmit to handle the form validation using zod and call the action
  function onSubmit(values: LoginValues) {
    // 4.1 startTransition to set the pending state
    startTransition(() => {
      action(values);
    });
  }

  // 5. renderFormField to render the form fields based on the formFields array without repeating the code
  const renderFormField = ({ name, label, type, placeholder }: FormFieldConfig, key: string) => (
    <FormField
      key={key}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} disabled={isPending} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // 6. renderFormStatus to render the form status based on the response from the LoginAction
  const renderFormStatus = () => (
    <>
      {data?.success && <FormSuccess message={data.message} />}
      {data?.success === false && <FormError message={data.message} />}
    </>
  );

  return (
    <AuthFormWrapper
      formTitle="Log In to Your Account"
      formDescription="Enter your credentials to access your account."
      formType="login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map((field) => renderFormField(field, field.name))}
          {renderFormStatus()}

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default LoginForm;
