import React from 'react';

export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'info' | 'success' | 'warn' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ variant, size, className, ...props }, ref) => (
    <span
      ref={ref}
      className={[
        'dot',
        variant && `dot-${variant}`,
        size && size !== 'md' && `dot-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
);

Dot.displayName = 'Dot';
