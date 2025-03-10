'use client';

import { useActionState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signupSchema } from '@/lib/schemas/auth';
import { SignupFormData } from '@/lib/types/auth';
import { signup } from '@/lib/actions/auth';

// UI Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import FormStatus from '@/components/auth/FormStatus';

// Type Definitions for form fields
interface FormFieldConfig {
  name: keyof SignupFormData;
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
  const [data, action] = useActionState(signup, undefined);
  // 2. useTransition hook to handle the pending state of the form
  const [isPending, startTransition] = useTransition();

  // 3. useForm hook to handle the form state
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 4. onSubmit to handle the form validation using zod and call the action
  function onSubmit(values: SignupFormData) {
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
  const renderFormStatus = () => {
    if (!data || data.message === undefined) return null;

    return <FormStatus type={data.success ? 'success' : 'error'} message={data.message} />;
  };

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
