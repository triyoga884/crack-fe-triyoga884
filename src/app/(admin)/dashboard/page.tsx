'use client';
import DashboardCard from '@/components/DashboardCard';
import { useAllStat, useStatProvider } from '../_api/queries';
import { Stat } from '../../../lib/type';
import { Skeleton } from '../../../components/ui/skeleton';
import { useAuth } from '../../../hooks/useAuth';

function Page() {
  const { user } = useAuth();
  const { data: adminStats, isPending: adminLoading } = useAllStat(user.role);
  const { data: providerStats, isPending: providerLoading } = useStatProvider(
    user.userId
  );

  const isProvider = user?.role === 'PROVIDER';
  const data = isProvider ? providerStats : adminStats;
  const loading = isProvider ? providerLoading : adminLoading;

  return (
    <div className="space-y-6">
      {/* Dashboard Content */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
          {data.map((item: Stat) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
