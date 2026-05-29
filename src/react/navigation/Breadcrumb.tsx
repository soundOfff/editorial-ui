import React from 'react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={['breadcrumb', className].filter(Boolean).join(' ')}
        {...props}
      >
        {items.map((item, idx) => {
          const isCurrent = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="breadcrumb-sep" aria-hidden="true">/</span>}
              <span className={['breadcrumb-item', isCurrent && 'is-current'].filter(Boolean).join(' ')}>
                {isCurrent || !item.onClick ? (
                  item.label
                ) : (
                  <button onClick={item.onClick}>{item.label}</button>
                )}
              </span>
            </React.Fragment>
          );
        })}
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';
