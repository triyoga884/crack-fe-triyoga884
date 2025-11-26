'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

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
import RoomCard from '@/components/RoomCard';
import SearchBar from '@/components/SearchBar';

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
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="workspaces-list grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 place-items-stretch">
        {data?.map((e: Room) => (
          <RoomCard key={`room-${e.id}`} {...e} />
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
