'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  contact: z.string().min(10, 'Contact number is required'),
  companyName: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});

function Page() {
  const { data } = useQuery({
    queryKey: ['workspace-detail'],
    queryFn: async () => {
      const response = await fetch('/dummy/1room.json');
      return response.json();
    },
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      companyName: '',
      startDate: undefined,
      endDate: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    console.log(data);
    router.push('/checkout');
  };

  const [calenderStartOpen, setCalendarStartOpen] = useState(false);
  const [calenderEndOpen, setCalendarEndOpen] = useState(false);

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

          <Dialog>
            <form id="booking-form" onSubmit={form.handleSubmit(onSubmit)}>
              <DialogTrigger asChild>
                <Button>Book Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Booking Form</DialogTitle>
                  <DialogDescription>
                    Please fill form below. Click ok when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className="grid md:grid-cols-2 gap-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          id="name"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="contact"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="contact">Contact</FieldLabel>
                        <Input
                          id="contact"
                          type="contact"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="companyName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="companyName">
                          Company Name
                        </FieldLabel>
                        <Input
                          id="companyName"
                          type="companyName"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <Label htmlFor="date">Start Date</Label>
                        <Popover
                          open={calenderStartOpen}
                          onOpenChange={setCalendarStartOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="justify-between"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : 'Select date'}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setCalendarStartOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <Label htmlFor="date">End Date</Label>
                        <Popover
                          open={calenderEndOpen}
                          onOpenChange={setCalendarEndOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="justify-between"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : 'Select date'}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setCalendarEndOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" form="booking-form">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Page;
