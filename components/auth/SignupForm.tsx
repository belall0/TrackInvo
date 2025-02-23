'use client';

import { useActionState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema, SignupValues } from '@/lib/schema';
import { signupAction } from '@/lib/actions';

// UI Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import FormSuccess from '@/components/FormSuccess';
import FormError from '@/components/FormError';

// Type Definitions for form fields
interface FormFieldConfig {
  name: keyof SignupValues;
  label: string;
  type: string;
  placeholder: string;
}

// Form Fields
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
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '********',
  },
];

const SignupForm = () => {
  // 1. useActionState hook to get the response from the loginAction
  const [data, action] = useActionState(signupAction, undefined);
  // 2. useTransition hook to handle the pending state of the form
  const [isPending, startTransition] = useTransition();

  // 3. useForm hook to handle the form state
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 4. onSubmit to handle the form validation using zod and call the action
  function onSubmit(values: SignupValues) {
    // 4.1 startTransition to set the pending state
    startTransition(() => {
      action(values);
    });
  }

  // 5. renderFormField to render the form fields based on the formFields array without repeating the code
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

  // 6. renderFormStatus to render the form status based on the response from the loginAction
  const renderFormStatus = () => (
    <>
      {data?.success && <FormSuccess message={data.message} />}
      {data?.success === false && <FormError message={data.message} />}
    </>
  );

  return (
    <AuthFormWrapper
      formTitle="Create Your Account"
      formDescription="Sign up to get started. It’s quick and secure."
      formType="signup">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map((field) => renderFormFields(field, field.name))}
          {renderFormStatus()}

          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignupForm;
