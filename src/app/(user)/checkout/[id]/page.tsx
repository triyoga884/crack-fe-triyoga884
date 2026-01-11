'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useBookingById, useWorkspaceById } from '../../_api/queries';
import { useParams } from 'next/navigation';
import { Skeleton } from '../../../../components/ui/skeleton';
import { dateOnly } from '../../../../lib/datesFormatter';

function Page() {
  const { id } = useParams();
  const { data: booking, isPending, error } = useBookingById(id as string);
  console.log(booking);
  const { data: workspace } = useWorkspaceById(booking.coworkingSpaceId);
  // const workspace = {
  //   name: 'tes',
  //   description: 'tes',
  //   address: 'tes',
  // };

  const form = useForm({
    defaultValues: {
      paymentMethod: 'option-one',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      {isPending ? (
        <div className="min-h-[calc(100vh-300px)]  flex flex-col gap-4 p-4 md:flex-row my-8 md:my-12">
          <Skeleton className="h-[300px] md:h-[450px] md:flex-1" />
          <div className="flex flex-col gap-2 md:gap-4  md:flex-1">
            <Skeleton className="h-4 md:w-[80%]" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 md:w-[50%]" />
            <Skeleton className="h-4 md:w-[80%]" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 md:w-[50%]" />
            <Skeleton className="h-10 w-[20%]" />
          </div>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-300px)] space-y-8  p-4 md:p-8 flex flex-col md:flex-row gap-8 md:gap-16 my-6 md:my-12">
          {/* Card */}
          <div className="space-y-6 w-full">
            <h1 className="font-bold text-2xl">Checkout</h1>
            <Card>
              <CardHeader>
                <CardTitle>{workspace.name}</CardTitle>
                <CardDescription>{workspace.description}</CardDescription>
              </CardHeader>
              <CardContent className="font-medium text-sm flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Calendar />{' '}
                  <p>{`${dateOnly(booking.startDate)} - ${dateOnly(
                    booking.endDate
                  )}`}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin /> <p>{workspace.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Order Details  */}
          <div className="space-y-6 w-full">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <div className="flex justify-between">
                <p>Amount</p>
                <p>{booking.totalPrice}</p>
              </div>
              {/* <div className="flex justify-between">
            <p>Tax</p>
            <p>Rp.18.000</p>
          </div> */}
              <Separator />
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>{booking.totalPrice}</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <form id="payment-method" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                  name="paymentMethod"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 justify-between border-b pb-2 mb-2">
                        <label htmlFor="credit">Credit Card</label>
                        <RadioGroupItem value="credit" id="credit" />
                      </div>

                      <div className="flex items-center gap-2 justify-between border-b pb-2 mb-2">
                        <label htmlFor="paypal">PayPal</label>
                        <RadioGroupItem value="paypal" id="paypal" />
                      </div>
                    </RadioGroup>
                  )}
                />
              </form>
            </div>
            <Button
              form="payment-method"
              className="w-full mt-4 py-6 text-xl"
              type="submit"
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
