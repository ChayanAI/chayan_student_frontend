"use client";

import { usePathname } from 'next/navigation';
import MainLayout from '../components/MainLayout';
import AuthLayout from '../components/AuthLayout';
import InputLayout from '../components/InputLayout';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = (pathname === '/login');
  const isInputPage = pathname === '/inputform';
  const isVerifyPage = pathname === '/verify';
  const isInputPage1 = pathname === '/';

  if (isAuthPage) {
    return (
      <html lang="en">
        <body>
          <AuthLayout>{children}</AuthLayout>
        </body>
      </html>
    );
  }

  if (isInputPage || isInputPage1) {
    return (
      <html lang="en">
        <body>
          <InputLayout>{children}</InputLayout>
        </body>
      </html>
    );
  }

  if (isVerifyPage) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <MainLayout showHeader={true}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
