'use client';
import { useLogout } from '../../../auth/mutations';
import { Button } from '../../../components/ui/button';
import { useProfile, useUserBookings } from '../_api/queries';
import { Skeleton } from '../../../components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '../../../hooks/useAuth';
import { dateOnly } from '../../../lib/datesFormatter';
import { rupiahFormat } from '../../../lib/rupiahFormatter';

export default function Profile() {
  const { user: user } = useAuth();
  const { mutate: logout, isPending, error } = useLogout();
  const { data: profile, isPending: loading } = useProfile();
  const { data: bookings, isPending: bookingsLoading } = useUserBookings();
  console.log(bookings);
  const handleLogout = () => {
    logout();
  };

  const data = [
    {
      name: 'Profile',
      value: 'profile',
    },
    {
      name: 'Booking',
      value: 'booking',
    },
  ];

  return loading ? (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Profile Header Skeleton */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Skeleton className="h-16 w-16 rounded-full" />

            <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>

            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* Account Information Skeleton */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <Skeleton className="mb-4 h-5 w-48" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Contact Information Skeleton */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <Skeleton className="mb-4 h-5 w-52" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>

        {/* Action Skeleton */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="min-w-xl">
        <Tabs defaultValue={data[0].value}>
          <TabsList>
            {data.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            className="space-y-6"
            value={data[0].value}
            key={data[0].value}
          >
            {/* Profile Header */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {profile?.initialName}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {profile.name}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {profile.email}
                  </p>
                </div>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide">
                  {profile.role}
                </span>
              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">
                Account Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{profile.role}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">
                Contact Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <Button
                variant="destructive"
                className="w-full"
                disabled={isPending}
                onClick={handleLogout}
              >
                {isPending ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value={data[1].value} key={data[1].value}>
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <Table>
                <TableCaption className="mt-2 text-sm text-muted-foreground">
                  A list of your recent bookings.
                </TableCaption>

                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Workspace Name</TableHead>
                    <TableHead>Workspace Address</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Total Price</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {bookings?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-2xl">
                            📄
                          </div>
                          <p className="font-medium">No bookings found</p>
                          <p className="text-sm text-muted-foreground">
                            You haven’t made any bookings yet.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings?.map((booking: any) => (
                      <TableRow key={booking.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          {booking.coworkingSpace.name}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {booking.coworkingSpace.address}
                        </TableCell>
                        <TableCell>
                          {booking.coworkingSpace.capacity} Person
                        </TableCell>
                        <TableCell>{dateOnly(booking.startDate)}</TableCell>
                        <TableCell>{dateOnly(booking.endDate)}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{booking.payment.status}</TableCell>
                        <TableCell className="text-right font-medium">
                          {rupiahFormat(booking.totalPrice)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
