import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Example({ baseIndex, changeBaseIndex, articlesList, numPerPage }) {
  const currentPage =
    'relative inline-flex items-center z-10 px-4 py-2 text-sm font-semibold bg-sky-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600';
  const defaultPage =
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

  const pageIndexMapping = Array.from(
    { length: Math.ceil(articlesList.length / 6) },
    (_, index) => index + 1
  );

  return (
    <div className="mx-auto max-w-7xl flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-white">
            Showing <span className="font-medium dark:font-bold">{baseIndex + 1}</span> to{' '}
            <span className="font-medium dark:font-bold">{baseIndex + 6}</span> of{' '}
            <span className="font-medium dark:font-bold">{articlesList.length}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => changeBaseIndex(baseIndex - 6)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {pageIndexMapping.map((pageNum) => {
              if (pageNum <= 3) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => changeBaseIndex(numPerPage * (pageNum - 1))}
                    className={
                      baseIndex < pageNum * numPerPage && baseIndex >= (pageNum - 1) * numPerPage
                        ? currentPage
                        : defaultPage
                    }
                  >
                    {pageNum}
                  </button>
                );
              }
            })}
            {articlesList.length > numPerPage * 6 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            )}
            {pageIndexMapping.map((pageNum) => {
              if (pageNum > pageIndexMapping.length - 3 && pageNum > 3) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => changeBaseIndex(numPerPage * (pageNum - 1))}
                    className={
                      baseIndex < pageNum * numPerPage && baseIndex >= (pageNum - 1) * numPerPage
                        ? currentPage
                        : defaultPage
                    }
                  >
                    {pageNum}
                  </button>
                );
              }
            })}
            <button
              onClick={() => changeBaseIndex(baseIndex + 6)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
