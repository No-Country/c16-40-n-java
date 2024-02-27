import Footer from '@/components/footer/mainFooter';
import Navbar from '@/components/navbar/mainNavbar';

export default function MainLayout({
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
