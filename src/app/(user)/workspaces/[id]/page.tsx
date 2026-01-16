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
import { useWorkspaceById } from '../../_api/queries';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { rupiahFormat } from '../../../../lib/rupiahFormatter';
import { SearchX } from 'lucide-react';

function Page() {
  const { id } = useParams();
  const { data, isPending, error } = useWorkspaceById(id as string);
  const [modalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleModal = () => {
    if (isAuthenticated) {
      setModalOpen(true);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {isPending ? (
        <div className="my-10 flex min-h-[calc(100vh-300px)] flex-col gap-6 md:flex-row">
          <Skeleton className="h-80 w-full rounded-xl md:h-[460px] md:flex-1" />

          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      ) : (
        <div className="my-10 flex min-h-[calc(100vh-300px)] flex-col gap-8 md:flex-row">
          {data.statusCode === 404 ? (
            <div className="col-span-full w-full flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">
                <SearchX />
              </div>

              <h2 className="text-lg font-semibold">No workspaces found</h2>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                We couldn’t find any workspaces matching your search. Try
                adjusting your filters or search keywords.
              </p>
            </div>
          ) : (
            <>
              {/* Workspace Image */}
              <Carousel className="md:flex-1">
                <CarouselContent>
                  {data?.images.map((img: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative h-80 w-full overflow-hidden rounded-xl md:h-[460px]">
                        <Image
                          src={img}
                          alt="Workspace Image"
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          loading="eager"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Workspace Description */}
              <div className="flex flex-1 flex-col space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {data?.name}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    {data?.description}
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Amenities</h2>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {data?.amenities.map((amenity: string, index: number) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-muted-foreground">
                      Type
                    </h2>
                    <p className="font-medium">{data?.type}</p>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-muted-foreground">
                      Capacity
                    </h2>
                    <p className="font-medium">{data?.capacity} person</p>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <h2 className="text-sm font-medium text-muted-foreground">
                      Location
                    </h2>
                    <p className="font-medium">{data?.address}</p>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <h2 className="text-sm font-medium text-muted-foreground">
                      Price
                    </h2>
                    <p className="text-lg font-semibold">
                      {rupiahFormat(data?.pricePerDay)}
                      <span className="text-sm font-normal text-muted-foreground">
                        {' '}
                        / day
                      </span>
                    </p>
                  </div>
                </div>

                <Separator />

                <Button
                  size="lg"
                  className="w-full md:w-fit px-10"
                  onClick={handleModal}
                >
                  Book Now
                </Button>

                <BookingFormModal
                  workspace={data!}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default Page;
