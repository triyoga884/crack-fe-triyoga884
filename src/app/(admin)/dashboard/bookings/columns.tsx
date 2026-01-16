'use client';

import { ColumnDef } from '@tanstack/react-table';
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
];
