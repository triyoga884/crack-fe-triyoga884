import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BookingSchema, bookingSchema } from '@/lib/schema';
import { useDateAvailable } from '../app/(user)/_api/queries';
import { useBooking } from '../app/(user)/_api/mutations';
import { isWithinInterval, startOfDay } from 'date-fns';
import { dateOnly } from '../lib/datesFormatter';

interface Prop {
  workspace: any;
  modalOpen: boolean;
  setModalOpen: any;
}

function BookingFormModal({ workspace, modalOpen, setModalOpen }: Prop) {
  const router = useRouter();
  const { data: date } = useDateAvailable(workspace.id);
  const { mutate: postBooking } = useBooking();

  const disabledRanges = date ? date : [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isUnavailable = (date: Date) => {
    const normalized = startOfDay(date);
    return disabledRanges?.some((range: any) => {
      const start = startOfDay(new Date(range.startDate));
      const end = startOfDay(new Date(range.endDate));
      return isWithinInterval(normalized, { start, end });
    });
  };

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      workspaceId: workspace.id,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const onSubmit = (data: BookingSchema) => {
    const formatData = {
      workspaceId: data.workspaceId,
      startDate: dateOnly(data.startDate),
      endDate: dateOnly(data.endDate),
    };
    postBooking(formatData, {
      onSuccess: (response) => {
        const id = response.id;
        router.push(`/checkout/${id}`);
      },
    });
  };

  const [calenderStartOpen, setCalendarStartOpen] = useState(false);
  const [calenderEndOpen, setCalendarEndOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <form id="booking-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Booking Form</DialogTitle>
            <DialogDescription>
              Please fill form below. Click ok when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="grid md:grid-cols-2 gap-4">
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label>Start Date</Label>
                  <Popover
                    open={calenderStartOpen}
                    onOpenChange={setCalendarStartOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-between">
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
                        disabled={(date) => date < today || isUnavailable(date)}
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
              render={({ field, fieldState }) => {
                const startDate = form.watch('startDate');
                return (
                  <Field>
                    <Label>End Date</Label>
                    <Popover
                      open={calenderEndOpen}
                      onOpenChange={setCalendarEndOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-between">
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
                          disabled={(date) =>
                            date < today ||
                            (startDate && date < new Date(startDate)) ||
                            isUnavailable(date)
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="booking-form">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default BookingFormModal;
