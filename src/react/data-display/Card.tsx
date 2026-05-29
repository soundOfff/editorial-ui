import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'quote' | 'stat';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, className, children, ...props }, ref) => {
    const cls = [
      variant === 'quote' ? 'card-quote' : variant === 'stat' ? 'card-stat' : 'card',
      className,
    ].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={cls} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
