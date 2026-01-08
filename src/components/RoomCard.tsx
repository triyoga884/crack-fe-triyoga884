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
import { Room } from '@/lib/type';

function RoomCard(e: Room) {
  return (
    <Card key={`room-${e.id}`} className="justify-between">
      <CardHeader>
        <Image
          src={e.images[0]}
          alt={e.name}
          width={400}
          height={300}
          unoptimized
          className="rounded-2xl"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle>{e.name}</CardTitle>
        <CardDescription>{e.address}</CardDescription>
        <div>
          <p>{e.type}</p>
          <p>{e.pricePerDay}/day</p>
          <p>{e.description} people</p>
        </div>
      </CardContent>
      <CardFooter className="flex-row-reverse">
        <Button>
          <Link href={`/workspaces/${e.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RoomCard;
