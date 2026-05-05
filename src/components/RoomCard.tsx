import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { RawRoom } from '@/lib/type';
import { rupiahFormat } from '../lib/rupiahFormatter';

function RoomCard(e: RawRoom) {
  return (
    <Card
      key={`room-${e.id}`}
      className='flex h-full flex-col justify-between rounded-2xl overflow-hidden shadow-sm transition hover:shadow-md'
    >
      {/* Image */}
      <CardHeader className='p-0'>
        <Image
          src={e.images[0]}
          alt={e.name}
          width={400}
          height={300}
          unoptimized
          loading='eager'
          className='h-[220px] w-full object-cover'
        />
      </CardHeader>
      <CardContent className='flex flex-col gap-4 p-4'>
        {/* Title & Address */}
        <div className='space-y-1'>
          <CardTitle className='text-lg font-semibold leading-tight'>
            {e.name}
          </CardTitle>
          <CardDescription className='text-sm'>{e.address}</CardDescription>
        </div>

        {/* Price & Capacity */}
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div className='space-y-1'>
            <p className='text-xs text-muted-foreground'>Price</p>
            <p className='font-semibold'>
              {rupiahFormat(e.pricePerDay)}
              <span className='text-xs font-normal text-muted-foreground'>
                {' '}
                / day
              </span>
            </p>
          </div>

          <div className='space-y-1'>
            <p className='text-xs text-muted-foreground'>Capacity</p>
            <p className='font-semibold'>{e.capacity} people</p>
          </div>
        </div>

        {/* Description */}
        <p className='text-sm text-muted-foreground line-clamp-1'>
          {e.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className='p-4 pt-0'>
        <Button className='w-full'>
          <Link href={`/workspaces/${e.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RoomCard;
