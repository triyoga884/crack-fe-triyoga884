'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserDashboard } from '@/lib/type';
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
import EditUserFormModalAdmin from '@/components/EditUserFormModalAdmin';
import { useDeleteUser } from '../../_api/mutation';

export const columns: ColumnDef<UserDashboard>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'workspaces',
    header: 'Workspaces',
    cell: ({ row }) => {
      const workspaces = row.original.workspace
        .map((workspace: any) => workspace.name)
        .join(', ');
      return <span>{workspaces}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      const { mutate: deleteUser } = useDeleteUser();

      const handleDelete = (id: string) => {
        deleteUser(id);
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
              <EditUserFormModalAdmin
                onClose={() => setEditOpen(false)}
                payload={user}
              />
            </Dialog>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Warning</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{user.name}
                  "?
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
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
