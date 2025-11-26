'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Room } from '@/lib/type';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function Page() {
  const { data } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch('/dummy/room.json');
      return response.json();
    },
  });

  const [search, setSearch] = React.useState('');

  const handleSearch = (e: string): any => {
    console.log(e);
    setSearch('');
  };

  const handleCategoryChange = (value: string): any => {
    console.log(value);
  };

  // console.log(query.data);

  return (
    <div className="min-h-screen container mx-auto px-4">
      <div className="search-bar flex flex-col lg:flex-row gap-4 mt-8">
        <InputGroup>
          <InputGroupInput
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={() => handleSearch(search)}>
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Select onValueChange={(value: string) => handleCategoryChange(value)}>
          <SelectTrigger className="w-full lg:w-1/2">
            <SelectValue placeholder="Select Room Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Type</SelectItem>
            <SelectItem value="meeting-room">Meeting Room</SelectItem>
            <SelectItem value="private-office">Private Office</SelectItem>
            <SelectItem value="podcast-studio">Podcast Studio</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="workspaces-list grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 place-items-stretch">
        {data?.map((e: Room) => (
          <Card key={`room-${e.id}`} className="justify-between">
            <CardHeader>
              <Image
                src={e.images[0]}
                alt={e.name}
                width={400}
                height={300}
                unoptimized
              />
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle>{e.name}</CardTitle>
              <CardDescription>{e.address}</CardDescription>
              <div className="flex justify-between">
                <div>
                  <p>{e.capacity} people</p>
                  <p>{e.room_type}</p>
                </div>
                <div>
                  <p>{e.price_per_hour}/hour</p>
                  <p>{e.price_per_day}/day</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-row-reverse">
              <Button>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Page;
