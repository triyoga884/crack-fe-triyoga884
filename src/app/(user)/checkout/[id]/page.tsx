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
import { Calendar, MapPin, User } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useCheckout } from '../../_api/queries';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '../../../../components/ui/skeleton';
import { dateOnly } from '../../../../lib/datesFormatter';
import { usePayment } from '../../_api/mutations';
import { rupiahFormat } from '../../../../lib/rupiahFormatter';

function Page() {
  const { id } = useParams();
  const { data: booking, isPending, error } = useCheckout(id as string);

  const { mutate: postPayment } = usePayment();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      method: '',
    },
  });

  const onSubmit = (data: { method: string }) => {
    const req = { method: data.method, bookingId: booking.id };
    postPayment(req, {
      onSuccess: () => router.push('/'),
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {isPending ? (
        <div className="my-10 flex min-h-[calc(100vh-300px)] flex-col gap-6 md:flex-row">
          {/* Image / Card Skeleton */}
          <Skeleton className="h-80 w-full rounded-xl md:h-[460px] md:flex-1" />

          {/* Content Skeleton */}
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      ) : (
        <div className="my-10 flex min-h-[calc(100vh-300px)] flex-col gap-10 md:flex-row md:gap-16">
          {/* Checkout Info */}
          <div className="w-full space-y-6 md:flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">
                  {booking.coworkingSpace.name}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-1">
                  {booking.coworkingSpace.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-2 font-medium">
                  {booking.coworkingSpace.type}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <p>{booking.coworkingSpace.capacity} person</p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <p>
                    {dateOnly(booking.startDate)} – {dateOnly(booking.endDate)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <p>{booking.coworkingSpace.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order & Payment */}
          <div className="w-full space-y-8 md:max-w-md">
            {/* Order Summary */}
            <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Order Details</h2>

              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Amount</p>
                <p>{rupiahFormat(booking.totalPrice)}</p>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-bold">
                <p>Total</p>
                <p>{rupiahFormat(booking.totalPrice)}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Payment Method</h2>

              <form
                id="payment-method"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <Controller
                  name="method"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-3"
                    >
                      <label className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-muted">
                        <span className="font-medium">Credit Card</span>
                        <RadioGroupItem value="CREDIT_CARD" id="credit" />
                      </label>

                      <label className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-muted">
                        <span className="font-medium">Transfer</span>
                        <RadioGroupItem value="TRANSFER" id="transfer" />
                      </label>
                    </RadioGroup>
                  )}
                />
              </form>
            </div>

            {/* CTA */}
            <Button
              form="payment-method"
              type="submit"
              className="h-12 w-full text-base font-semibold"
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
