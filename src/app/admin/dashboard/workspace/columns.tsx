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
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useState } from 'react';

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
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const workspace = row.original;

      const handleDelete = (id: number) => {
        alert(id);
        setOpen(false);
      };

      const [open, setOpen] = useState(false);
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
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href={`/admin/dashboard/workspace/edit/${workspace.id}`}>
                  Edit
                </Link>
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
