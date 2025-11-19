import Banner from '@/components/Banner';
import Service from '@/components/Service';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-primary-foreground flex flex-col gap-4 ">
      <Banner />
      <Service />
      <Footer />
    </div>
  );
}
