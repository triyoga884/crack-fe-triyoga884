import Banner from '@/components/Banner';
import Service from '@/components/Service';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-primary-foreground flex flex-col gap-4 md:gap-20">
      <Banner />
      <Service />
      <Footer />
    </div>
  );
}
