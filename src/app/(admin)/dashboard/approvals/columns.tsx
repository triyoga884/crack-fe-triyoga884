'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import ConfirmModal from '@/components/ConfirmModal';
import { useDeleteWorkspace, useUpdateWorkspace } from '../../_api/mutation';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Room Name',
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity',
  },
  {
    accessorKey: 'isActive',
    header: 'Active Status',
  },
  {
    accessorKey: 'isVerified',
    header: 'Verified Status',
  },
  {
    accessorKey: 'type',
    header: 'Room Type',
  },
  {
    accessorKey: 'pricePerDay',
    header: 'Price Per Day',
  },
  {
    accessorKey: 'amenities',
    header: 'Amenities',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const workspace = row.original;

      const [modalApproveOpen, setModalApproveOpen] = useState(false);
      const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

      const { mutate: update } = useUpdateWorkspace();
      const { mutate: deleteWorkspace } = useDeleteWorkspace();

      const handleApprove = () => {
        workspace.isVerified = true;
        console.log(workspace);
        update(workspace);
        setModalApproveOpen(false);
      };
      const handleDelete = () => {
        deleteWorkspace(workspace.id);
        setModalDeleteOpen(false);
      };

      return (
        <div className="space-x-1">
          <Button onClick={() => setModalApproveOpen(true)}>
            <Check />
          </Button>
          <Button
            onClick={() => setModalDeleteOpen(true)}
            variant="destructive"
          >
            <Trash />
          </Button>
          <Dialog open={modalApproveOpen} onOpenChange={setModalApproveOpen}>
            <ConfirmModal
              title="Approve Workspace"
              desc="Are you sure approve this workspace?"
              func={handleApprove}
              closeFunc={setModalApproveOpen}
            />
          </Dialog>
          <Dialog open={modalDeleteOpen} onOpenChange={setModalDeleteOpen}>
            <ConfirmModal
              title="Delete Workspace"
              desc="Are you sure delete this workspace?"
              variant="destructive"
              func={handleDelete}
              closeFunc={setModalDeleteOpen}
            />
          </Dialog>
        </div>
      );
    },
  },
];
