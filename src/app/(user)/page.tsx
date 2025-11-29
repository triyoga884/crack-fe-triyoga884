import Banner from '@/components/Banner';
import Service from '@/components/Service';

export default function Home() {
  return (
    <div className=" flex flex-col gap-4 md:gap-20 px-4 lg:px-0">
      <Banner />
      <Service />
    </div>
  );
}
