'use client';
import { useRouter } from 'next/navigation';
import { useLogout } from '../../../../auth/mutations';
import { Button } from '../../../../components/ui/button';
import { useProfile } from '../../../(user)/_api/queries';
import { Skeleton } from '../../../../components/ui/skeleton';

export default function Profile() {
  const { mutate: logout, isPending, error } = useLogout();
  const { data: user, isPending: loading } = useProfile();
  const router = useRouter();
  const handleLogout = async () => {
    logout(undefined, { onSuccess: () => router.push('/login') });
  };
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <div className="bg-white rounded-lg border shadow-sm p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-16 w-16 rounded-full" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-600">
              {user.initialName}
            </div>
          )}

          <div className="space-y-2">
            {loading ? (
              <>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <>
              <ProfileFieldSkeleton />
              <ProfileFieldSkeleton />
              <ProfileFieldSkeleton />
              <ProfileFieldSkeleton />
            </>
          ) : (
            <>
              <ProfileField label="Full Name" value={user.name} />
              <ProfileField label="Email Address" value={user.email} />
              <ProfileField label="Phone Number" value={user.phone} />
              <ProfileField label="Role" value={user.role} />
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end border-t pt-4">
          {loading ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : (
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleLogout}
            >
              {isPending ? 'Logging out...' : 'Logout'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium bg-gray-50 border rounded-md px-3 py-2">
        {value}
      </span>
    </div>
  );
}
function ProfileFieldSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  );
}
