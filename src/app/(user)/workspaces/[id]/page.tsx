'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import React from 'react';
import { Separator } from '@/components/ui/separator';

import BookingFormModal from '@/components/BookingFormModal';

function Page() {
  const { data } = useQuery({
    queryKey: ['workspace-detail'],
    queryFn: async () => {
      const response = await fetch('/dummy/1room.json');
      return response.json();
    },
  });

  return (
    <div className="container mx-auto">
      <div className="min-h-[calc(100vh-300px)] flex flex-col gap-4 p-4 md:flex-row my-8 md:my-12">
        {/* workspace image */}
        <Carousel className="md:flex-1">
          <CarouselContent>
            {data?.images.map((img: string, index: number) => (
              <CarouselItem key={index}>
                <div className="img h-[300px] md:h-[450px] w-full relative">
                  <Image src={img} alt="Workspace Image" unoptimized fill />
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
          {/* dialog booking workspace */}
          <BookingFormModal data={data!} />
        </div>
      </div>
    </div>
  );
}

export default Page;
