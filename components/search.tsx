'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  ReadonlyURLSearchParams,
  useSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';

const Search = ({ placeholder }: { placeholder: string }) => {
  // Get the current search params and pathname
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname: string = usePathname();
  const router: AppRouterInstance = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    // Create a new URLSearchParams object with the current search params to be able to modify them
    const params: URLSearchParams = new URLSearchParams(searchParams);

    // we want to reset the page to 1 when the search term changes
    params.set('page', '1');

    // Add the search term to the search params if it's not empty, otherwise remove it
    term ? params.set('query', term) : params.delete('query');

    // Update the URL with the new search term and navigate to the new URL
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query') || ''}
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default Search;
