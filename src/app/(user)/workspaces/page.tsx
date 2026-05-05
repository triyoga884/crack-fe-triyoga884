'use client';
import { RawRoom } from '@/lib/type';
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
import { useSearchWorkspace } from '../_api/queries';
import { Skeleton } from '../../../components/ui/skeleton';
import { useWorkspaceFilters } from '../../../lib/searchParamsFilter';
import { SearchX } from 'lucide-react';
import workspaceList from '@/assets/data/dummy/workspaceList.json';

function Page() {
  const [{ search, type }, setFilters] = useWorkspaceFilters();
  let { data: searchData, isPending: searchLoading } = useSearchWorkspace(
    search,
    type,
  );

  if (!searchData) {
    searchData = workspaceList;
    searchLoading = false;
  }

  return (
    <div className='lg:py-8'>
      <div className='min-h-screen container mx-auto px-4 '>
        <SearchBar initialSearch={search} type={type} setFilters={setFilters} />
        <div className='workspaces-list grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 place-items-stretch'>
          {searchLoading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <div className='space-y-2' key={idx}>
                <Skeleton className='h-[300px]' />
                <div className='flex flex-col gap-2 md:gap-4 '>
                  <Skeleton className='h-4 md:w-[80%]' />
                  <Skeleton className='h-4 md:w-[50%]' />
                  <Skeleton className='h-4 md:w-[80%]' />
                  <Skeleton className='h-4' />
                  <Skeleton className='h-10 w-[20%]' />
                </div>
              </div>
            ))
          ) : (
            <>
              {searchData.statusCode === 404 ? (
                <div className='col-span-full flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center'>
                  <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl'>
                    <SearchX />
                  </div>

                  <h2 className='text-lg font-semibold'>No workspaces found</h2>

                  <p className='mt-1 max-w-md text-sm text-muted-foreground'>
                    We couldn’t find any workspaces matching your search. Try
                    adjusting your filters or search keywords.
                  </p>
                </div>
              ) : (
                searchData?.map((e: RawRoom) => (
                  <RoomCard key={`room-${e.id}`} {...e} />
                ))
              )}
            </>
          )}
        </div>
        {/* <Pagination className="mt-8">
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
        </Pagination> */}
      </div>
    </div>
  );
}

export default Page;
