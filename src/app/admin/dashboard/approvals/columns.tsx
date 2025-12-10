'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Room } from '@/lib/type';
import { Check, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import ConfirmModal from '@/components/ConfirmModal';

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: 'name',
    header: 'Room Name',
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity',
  },
  {
    accessorKey: 'is_active',
    header: 'Active Status',
  },
  {
    accessorKey: 'is_verified',
    header: 'Verified Status',
  },
  {
    accessorKey: 'room_type',
    header: 'Room Type',
  },
  {
    accessorKey: 'price_per_day',
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

      const handleApprove = () => {
        alert(workspace.id);
      };
      const handleDelete = () => {
        alert(workspace.id);
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
