import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import Logo from '@/components/Logo';
import Image from 'next/image';

const page = () => {
  return (
    <main>
      <div className="flex items-center h-20 shrink-0 rounded-lg bg-blue-500 p-4 md:h-52">
        <Logo />
      </div>

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg  bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to TrackInvo.</strong> Effortlessly manage and track your invoices in one place.
          </p>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src={'/hero.svg'}
            width={400}
            height={400}
            alt="Hero Image"
            className="hidden md:block"
          />
        </div>
      </div>
    </main>
  );
};

export default page;
