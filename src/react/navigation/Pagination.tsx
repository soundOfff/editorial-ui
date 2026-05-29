import React from 'react';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | 'ellipsis'> = [];

  // Always show first page
  pages.push(1);

  if (page <= 4) {
    // Near the start
    pages.push(2, 3, 4, 5, 'ellipsis', totalPages);
  } else if (page >= totalPages - 3) {
    // Near the end
    pages.push('ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    // In the middle
    pages.push('ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages);
  }

  return pages;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ page, totalPages, onChange, className, ...props }, ref) => {
    const pageNumbers = getPageNumbers(page, totalPages);

    return (
      <div
        ref={ref}
        className={['pagination', className].filter(Boolean).join(' ')}
        role="navigation"
        aria-label="Pagination"
        {...props}
      >
        <button
          className={['page-item', page <= 1 && 'is-disabled'].filter(Boolean).join(' ')}
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          Prev
        </button>

        {pageNumbers.map((p, idx) =>
          p === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="page-item" aria-hidden="true">…</span>
          ) : (
            <button
              key={p}
              className={['page-item', p === page && 'is-active'].filter(Boolean).join(' ')}
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          className={['page-item', page >= totalPages && 'is-disabled'].filter(Boolean).join(' ')}
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';
