'use client';
import React from 'react';
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
import { useAllWorkspaces } from '../_api/queries';
import { Skeleton } from '../../../components/ui/skeleton';
import { useAuth } from '../../../hooks/useAuth';

function Page() {
  const { data, isPending, error } = useAllWorkspaces(true);

  const { user } = useAuth();
  console.log(user);

  const [search, setSearch] = React.useState('');

  const handleSearch = (e: string): any => {
    console.log(e);
    setSearch('');
  };

  const handleCategoryChange = (value: string): any => {
    console.log(value);
  };

  return (
    <div className="lg:py-8">
      <div className="min-h-screen container mx-auto px-4 ">
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          handleCategoryChange={handleCategoryChange}
        />
        <div className="workspaces-list grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 place-items-stretch">
          {isPending ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <div className="space-y-2" key={idx}>
                <Skeleton className="h-[300px]" />
                <div className="flex flex-col gap-2 md:gap-4 ">
                  <Skeleton className="h-4 md:w-[80%]" />
                  <Skeleton className="h-4 md:w-[50%]" />
                  <Skeleton className="h-4 md:w-[80%]" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-10 w-[20%]" />
                </div>
              </div>
            ))
          ) : (
            <>
              {data?.map((e: Room) => (
                <RoomCard key={`room-${e.id}`} {...e} />
              ))}
            </>
          )}
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
    </div>
  );
}

export default Page;
