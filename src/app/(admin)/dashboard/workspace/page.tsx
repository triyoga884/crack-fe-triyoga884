'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { apiToWorkspaceUpdateFormSchema } from '@/lib/schema';
import { useAuth } from '../../../../hooks/useAuth';
import { useWorkspaceByUserId } from '../../_api/queries';
import { useAllWorkspaces } from '../../../(user)/_api/queries';
import { Button } from '../../../../components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import CreateWorkspaceFormModal from '../../../../components/createWorkspaceFormModal';
import { Skeleton } from '../../../../components/ui/skeleton';

function Page() {
  const { user } = useAuth();
  const { data: provider, isLoading: providerLoading } = useWorkspaceByUserId(
    user.userId
  );
  const { data: admin, isLoading: adminLoading } = useAllWorkspaces(true);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const isProvider = user?.role === 'PROVIDER';
  const data = isProvider ? provider : admin;
  const loading = isProvider ? providerLoading : adminLoading;
  const fixData = data?.map((room: any) =>
    apiToWorkspaceUpdateFormSchema.parse(room)
  );

  return (
    <div>
      <div className="p-2 flex flex-row-reverse">
        <Button onClick={() => setCreateModalOpen(true)}>Add Workspace</Button>
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
      {data && <DataTable columns={columns} data={fixData} />}
    </div>
  );
}

export default Page;
