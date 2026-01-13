'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Room } from '@/lib/type';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import EditWorkspaceFormModal from '@/components/EditWorkspaceFormModal';
import { useDeleteWorkspace } from '../../_api/mutation';
import { useAuth } from '../../../../hooks/useAuth';

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
    cell: ({ row }) => {
      const amenities = row.original.amenities
        .map((amenity) => amenity.name)
        .join(', ');
      return <span>{amenities}</span>;
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { mutate: deleteWorkspace } = useDeleteWorkspace();
      const workspace = row.original;
      const handleDelete = (id: string) => {
        deleteWorkspace(id);
        setOpen(false);
      };

      const [open, setOpen] = useState(false);
      const [editOpen, setEditOpen] = useState(false);
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onSelect={(e: any) => {
                  e.preventDefault();
                  setEditOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onSelect={(e: any) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {editOpen && (
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <EditWorkspaceFormModal
                payload={workspace}
                onClose={() => setEditOpen(false)}
              />
            </Dialog>
          )}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Warning</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete workspace "{workspace.name}"?
                  This action cannot be undone.
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(workspace.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
