'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'react-toastify';

import { deleteInvoiceAction } from '@/lib/actions/invoices';
import { cn, formatCurrency, formatDate, formatDateToLocal } from '@/lib/utils';

import { FiMoreHorizontal } from 'react-icons/fi';
import { LuCopy, LuPencil, LuTrash, LuEye, LuArrowUpDown } from 'react-icons/lu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type Invoice = {
  id: string;
  userId: string;
  customerId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  customer: {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone?: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Customer
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <Button
          variant={'normal'}
          className="flex items-center gap-3"
          onClick={() => {
            router.push(`/dashboard/customers/${row.original.customer.id}`);
          }}>
          <Image
            src={row.original.customer.image}
            className="rounded-full"
            alt={`${row.original.customer.name}'s profile picture`}
            width={28}
            height={28}
          />
          <p>{row.original.customer.name}</p>
        </Button>
      );
    },
  },

  {
    accessorKey: 'customer.email',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Amount
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{formatCurrency(Number(row.original.amount))}</div>;
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge
            className={cn(
              row.original.status === 'paid' && 'bg-green-100 text-green-800',
              row.original.status === 'pending' && 'bg-yellow-100 text-yellow-800',
            )}>
            {row.original.status}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created At
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return <div className="text-center">{formatDateToLocal(formatDate(row.original.createdAt.toString()))}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();
      const [data, action] = useActionState(deleteInvoiceAction, undefined);
      const router = useRouter();
      const invoice = row.original;

      // Handle action result
      useEffect(() => {
        if (data?.success === true) {
          toast.success(data.message);
          router.refresh();
        } else if (data?.success === false) {
          toast.error(data.message);
        }
      }, [data]);

      // Prepare delete handler
      const handleDelete = () => {
        const formData = new FormData();
        formData.append('invoiceId', invoice.id);

        startTransition(() => {
          action(formData);
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FiMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => router.push(`/dashboard/customers/${invoice.customer.id}`)}>
              <LuEye />
              <span>View customer</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/dashboard/invoices/${invoice.id}/edit`)}>
              <LuPencil />
              <span>Edit invoice</span>
            </DropdownMenuItem>

            <AlertDialog>
              <AlertDialogTrigger>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent default dropdown behavior
                  }}>
                  <LuTrash />
                  <span>Delete customer</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the invoice and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
