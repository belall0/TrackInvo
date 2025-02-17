import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <Image
            src="/not-found.svg"
            alt="not found"
            width={1000}
            height={1000}
            className="mx-auto h-56 w-auto text-black sm:h-64"
          />

          <Link
            href="/dashboard/invoices"
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
            Go Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
