import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { inter } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Invo',
  description: 'A financial dashboard built with Next.js and Tailwind CSS.',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>
      {children}

      <ToastContainer />
    </body>
  </html>
);

export default RootLayout;
