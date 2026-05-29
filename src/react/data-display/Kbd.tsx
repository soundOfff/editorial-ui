import React from 'react';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={['kbd', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </kbd>
  )
);

Kbd.displayName = 'Kbd';
