'use client';
import { useLogout } from '../../../auth/mutations';
import { Button } from '../../../components/ui/button';
import { useProfile } from '../_api/queries';
import { Skeleton } from '../../../components/ui/skeleton';

export default function Profile() {
  const { mutate: logout, isPending, error } = useLogout();
  const { data: user, isPending: loading } = useProfile();
  const handleLogout = () => {
    logout();
  };

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
      <div className="w-full max-w-2xl space-y-6">
        {/* Profile Header */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {user?.initialName}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide">
              {user.role}
            </span>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Account Information</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone}</p>
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
      </div>
    </div>
  );
}
