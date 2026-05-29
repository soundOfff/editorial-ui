import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'info' | 'success' | 'warn' | 'danger';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={['badge', variant && `badge-${variant}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';
