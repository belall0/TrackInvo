'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';
import { LuEye } from 'react-icons/lu';
import { LuTrash } from 'react-icons/lu';
import { LuCopy } from 'react-icons/lu';
import { LuPencil } from 'react-icons/lu';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  total_invoices: number;
  paid_invoices: number;
  pending_invoices: number;
  total_paid: number;
  total_pending: number;
  total_revenue: number;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.image}
            className="rounded-full"
            alt={`${row.original.name}'s profile picture`}
            width={28}
            height={28}
          />
          <p>{row.original.name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'phone',
    header: 'Phone',
  },

  {
    accessorKey: 'total_invoices',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Invoices
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.total_invoices}</div>;
    },
  },
  {
    accessorKey: 'paid_invoices',
    // header: 'Paid Invoices',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Paid Invoices
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.paid_invoices}</div>;
    },
  },
  {
    accessorKey: 'pending_invoices',
    // header: 'Pending Invoices',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Pending Invoices
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.pending_invoices}</div>;
    },
  },
  {
    accessorKey: 'total_paid',
    // header: 'Total Paid',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Paid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.total_paid}</div>;
    },
  },
  {
    accessorKey: 'total_pending',
    // header: 'Total Pending',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Pending
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.total_pending}</div>;
    },
  },

  {
    accessorKey: 'total_revenue',
    // header: 'Total Revenue',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.total_revenue}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.email)}>
              <LuCopy /> <span>Copy customer email</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LuEye />
              <span>View customer</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LuPencil />
              <span>Edit customer</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LuTrash />
              <span>Delete customer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
