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
import { dateOnly } from '../../../../lib/datesFormatter';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <span>{row.original.user.name}</span>;
    },
  },
  {
    accessorKey: 'workspaceName',
    header: 'Workspace Name',
    cell: ({ row }) => {
      return <span>{row.original.coworkingSpace.name}</span>;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = dateOnly(new Date(row.original.startDate));
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = dateOnly(new Date(row.original.endDate));
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    cell: ({ row }) => {
      return <span>{`Rp.${row.original.totalPrice}`}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Booking Status',
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => {
      return <span>{row.original.payment.method}</span>;
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      return <span>{row.original.payment.status}</span>;
    },
  },

  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const { mutate: deleteWorkspace } = useDeleteWorkspace();
  //     const workspace = row.original;
  //     const handleDelete = (id: string) => {
  //       deleteWorkspace(id);
  //       setOpen(false);
  //     };

  //     const [open, setOpen] = useState(false);
  //     const [editOpen, setEditOpen] = useState(false);
  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuItem
  //               className="hover:cursor-pointer"
  //               onSelect={(e: any) => {
  //                 e.preventDefault();
  //                 setEditOpen(true);
  //               }}
  //             >
  //               Edit
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               className="hover:cursor-pointer"
  //               onSelect={(e: any) => {
  //                 e.preventDefault();
  //                 setOpen(true);
  //               }}
  //             >
  //               Delete
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>

  //         {editOpen && (
  //           <Dialog open={editOpen} onOpenChange={setEditOpen}>
  //             <EditWorkspaceFormModal
  //               payload={workspace}
  //               onClose={() => setEditOpen(false)}
  //             />
  //           </Dialog>
  //         )}

  //         <Dialog open={open} onOpenChange={setOpen}>
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>Warning</DialogTitle>
  //               <DialogDescription>
  //                 Are you sure you want to delete workspace "{workspace.name}"?
  //                 This action cannot be undone.
  //                 <div className="mt-4 flex justify-end space-x-2">
  //                   <Button variant="outline" onClick={() => setOpen(false)}>
  //                     Cancel
  //                   </Button>
  //                   <Button
  //                     variant="destructive"
  //                     onClick={() => handleDelete(workspace.id)}
  //                   >
  //                     Delete
  //                   </Button>
  //                 </div>
  //               </DialogDescription>
  //             </DialogHeader>
  //           </DialogContent>
  //         </Dialog>
  //       </>
  //     );
  //   },
  // },
];
