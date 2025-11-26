import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar />
      <body className={`antialiased`}>{children}</body>
      <Footer />
    </html>
  );
}
