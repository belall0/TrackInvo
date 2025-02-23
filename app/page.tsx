import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

// UI Components
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <main>
      <header className="flex h-20 shrink-0 items-center rounded-lg bg-blue-500 p-4 text-white">
        <Logo />
      </header>

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 shadow-xl md:w-3/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Welcome to Invo.</strong> Effortlessly manage and track your invoices in one place.
          </p>

          <div className="flex items-center gap-8">
            <Button className={'bg-blue-600 hover:bg-blue-700'}>
              <Link href="/auth/login" className="flex items-center gap-2">
                <span>Login</span>
                <FaArrowRightLong className="h-4 w-4" />
              </Link>
            </Button>

            <Button className={'border border-blue-600 bg-white text-blue-600 hover:bg-blue-50'}>
              <Link href="/auth/signup" className="flex items-center gap-2">
                <span>Sign up</span>
                <FaArrowRightLong className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image src={'/hero.svg'} width={400} height={400} alt="Hero Image" className="hidden md:block" />
        </div>
      </div>
    </main>
  );
};

export default page;
