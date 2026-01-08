'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import BookingFormModal from '@/components/BookingFormModal';
import { useWorkspaceById } from '../_api/queries';
import { useParams } from 'next/navigation';

function Page() {
  const { id } = useParams();
  const { data, isPending, error } = useWorkspaceById(id as string);

  return (
    <div className="container mx-auto">
      {isPending ? (
        <div className="min-h-[calc(100vh-300px)]  flex flex-col gap-4 p-4 md:flex-row my-8 md:my-12">
          <Skeleton className="h-[300px] md:h-[450px] md:flex-1" />
          <div className="flex flex-col gap-2 md:gap-4  md:flex-1">
            <Skeleton className="h-4 md:w-[80%]" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 md:w-[50%]" />
            <Skeleton className="h-4 md:w-[80%]" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 md:w-[50%]" />
            <Skeleton className="h-10 w-[20%]" />
          </div>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-300px)] flex flex-col gap-4 p-4 md:flex-row my-8 md:my-12">
          {/* workspace image */}
          <Carousel className="md:flex-1">
            <CarouselContent>
              {data?.images.map((img: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="img h-[300px] md:h-[450px] w-full relative">
                    <Image
                      src={img}
                      alt="Workspace Image"
                      unoptimized
                      fill
                      loading="eager"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* workspace desc */}
          <div className="space-y-4 flex-1">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <p>{data?.desc}</p>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <ul className="list-disc list-inside">
                {data?.amenities.map((amenity: string, index: number) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Location</h2>
              <p>{data?.address}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Price</h2>
              <p>${data?.pricePerDay}/day</p>
            </div>
            <Separator />
            {/* dialog booking workspace */}
            <BookingFormModal data={data!} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
