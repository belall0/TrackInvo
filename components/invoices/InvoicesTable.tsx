'use client';

import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { VscSettings } from 'react-icons/vsc';
import { CiSearch } from 'react-icons/ci';

import {
  ColumnDef,
  StockFeatures,
  SortingState,
  ColumnVisibilityState,
  RowData,
  flexRender,
  useTable,
  stockFeatures,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<StockFeatures, TData>[];
  data: TData[];
}
const DataTable = <TData extends RowData>({ columns, data }: DataTableProps<TData>) => {
  // for handling search
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // for handling table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    // to mark some columns as invisible by default
    phone: false,
    paid_invoices: false,
    pending_invoices: false,
  });

  // create a table instance
  const table = useTable({
    features: stockFeatures,
    data,
    columns,

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },

    state: {
      sorting,
      columnVisibility,
    },
  });

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <div className="flex items-center gap-x-4 py-4">
        {/* Search bar */}
        <div className="relative flex flex-1 shrink-0">
          <Input
            placeholder="Search by name, email, or phone..."
            defaultValue={searchParams.get('search')?.toString()}
            onChange={(e: React.ChangeEvent) => {
              handleSearch((e.target as HTMLInputElement).value);
            }}
            className="mr-4 h-10 w-full border border-gray-200 pl-10"
          />

          <CiSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <Link href="/dashboard/customers/create">
          <Button>Create Customer</Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <VscSettings />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-3">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginaiton Controllers */}
      <div className="mt-4 flex items-center justify-center space-x-2 py-4">
        <p className="text-sm text-gray-600">
          Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
        </p>

        <Button variant="outline" size="lg" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="lg" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
