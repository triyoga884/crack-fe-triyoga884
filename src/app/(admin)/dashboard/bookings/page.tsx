'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useAuth } from '../../../../hooks/useAuth';
import { useBookingMyWorkspace, useBookings } from '../../_api/queries';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import CreateWorkspaceFormModal from '../../../../components/createWorkspaceFormModal';
import { Skeleton } from '../../../../components/ui/skeleton';

function Page() {
  const { user } = useAuth();
  const { data: admin, isLoading: adminLoading } = useBookings(user.role);
  const { data: provider, isLoading: providerLoading } = useBookingMyWorkspace(
    user.userId
  );

  console.log('admin', admin);
  console.log('provider', provider);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const isProvider = user?.role === 'PROVIDER';
  const data = isProvider ? provider : admin;
  const loading = isProvider ? providerLoading : adminLoading;

  return (
    <div>
      <div className="p-2 flex flex-row-reverse">
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <CreateWorkspaceFormModal onClose={() => setCreateModalOpen(false)} />
        </Dialog>
      </div>
      {loading &&
        Array.from({ length: 10 }).map((_, idx) => (
          <div className="my-1 p-2" key={idx}>
            <Skeleton className="h-6" />
          </div>
        ))}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}

export default Page;
