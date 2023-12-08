'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { fetch_async } from './user/commun/fetch_async';
import { BASE_TWEET_URL, SNAP_FILTER } from './user/commun/urls';
import type { Snap } from './user/userSnaps';

export default function SearchSnaps({
  disabled,
  set,
}: {
  disabled?: boolean;
  set: any;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  async function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    let url = '';

    const snap_searched = params.toString().split('=')[1];

    const limit = 1000;
    const offset = 0;

    if (snap_searched) {
      url = `${SNAP_FILTER}content?content=${snap_searched}`;
    } else {
      url = `${BASE_TWEET_URL}get_all_snaps?limit=${limit}&offset=${offset}`;
    }

    const res: Snap[] = await fetch_async(url, 'content');

    set(res);

    console.log('res', res);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative mt-5 max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
        <input type="text" />
      </label>
      <div className="rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          className="block h-10 w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search by content..."
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {isPending && (
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
