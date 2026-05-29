import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  onDismiss?: () => void;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ onDismiss, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={['chip', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      {onDismiss && (
        <button
          type="button"
          className="chip-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </span>
  )
);

Chip.displayName = 'Chip';
