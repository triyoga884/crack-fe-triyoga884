import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { connection } from 'next/server';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
