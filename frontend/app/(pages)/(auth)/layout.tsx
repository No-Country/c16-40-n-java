import Footer from '@/components/footer/authFooter';
import Navbar from '@/components/navbar/authNavbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
