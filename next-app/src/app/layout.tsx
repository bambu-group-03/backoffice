import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.css';

import { Suspense } from 'react';

import Nav from './nav';

export const metadata = {
  title: 'Backoffice',
  description: 'A user admin dashboard.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <AuthContextProvider>
          <Suspense>
            <Nav />
          </Suspense>
          {children}
        </AuthContextProvider>
        
      </body>
    </html>
  );
}
