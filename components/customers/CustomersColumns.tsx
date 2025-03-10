'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'react-toastify';

import { deleteCustomerAction } from '@/lib/actions/customers';
import { formatCurrency } from '@/lib/utils';

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
            router.push(`/dashboard/customers/${row.original.id}`);
          }}>
          <Image
            src={row.original.image}
            className="rounded-full"
            alt={`${row.original.name}'s profile picture`}
            width={28}
            height={28}
          />
          <p>{row.original.name}</p>
        </Button>
      );
    },
  },

  {
    accessorKey: 'email',
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
    accessorKey: 'phone',
    header: 'Phone',
  },

  {
    accessorKey: 'total_invoices',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Invoices
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.total_invoices}</div>;
    },
  },
  {
    accessorKey: 'paid_invoices',

    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Paid Invoices
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return <div className="text-center">{row.original.paid_invoices}</div>;
    },
  },
  {
    accessorKey: 'pending_invoices',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Pending Invoices
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.pending_invoices}</div>;
    },
  },

  {
    accessorKey: 'total_revenue',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Revenue
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{formatCurrency(row.original.total_revenue)}</div>;
    },
  },

  {
    accessorKey: 'total_paid',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Paid
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{formatCurrency(row.original.total_paid)}</div>;
    },
  },
  {
    accessorKey: 'total_pending',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total Pending
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{formatCurrency(row.original.total_pending)}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();
      const [data, action] = useActionState(deleteCustomerAction, undefined);
      const router = useRouter();
      const customer = row.original;

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
        console.log(`handle`);
        const formData = new FormData();
        formData.append('customerId', customer.id);

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

            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.email)}>
              <LuCopy /> <span>Copy customer email</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => router.push(`/dashboard/customers/${customer.id}`)}>
              <LuEye />
              <span>View customer</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/dashboard/customers/${customer.id}/edit`)}>
              <LuPencil />
              <span>Edit customer</span>
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
                    This action cannot be undone. This will permanently delete the customer account for{' '}
                    <span className="font-bold">{customer.name}</span>.
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
