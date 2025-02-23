import Link from 'next/link';
import { ReactNode } from 'react';
import { FcGoogle } from 'react-icons/fc';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthFormWrapperProps {
  children: ReactNode;
  formTitle: string;
  formDescription: string;
  formType: 'login' | 'signup';
}

const AuthFormWrapper = ({ children, formTitle, formDescription, formType }: AuthFormWrapperProps) => {
  return (
    <Card className="w-[320px] sm:w-[400px] md:w-[500px]">
      <CardHeader className="space-y-2 p-6 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {formTitle}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{formDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-3">
        {children}

        {formType === 'login' ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground"> Don't have an account?</span>
            <Link href="/auth/signup">
              <span className="text-blue-600">Sign up</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground"> Already have an account?</span>
            <Link href="/auth/login">
              <span className="text-blue-600">Log In</span>
            </Link>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center gap-y-2">
        <div className="my-1 flex w-full items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm uppercase text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex w-full items-center justify-center gap-x-2">
          <Button size={'lg'} className="w-full" variant={'outline'}>
            <FcGoogle />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
