import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0-100, omit for indeterminate
  color?: 'default' | 'success' | 'info' | 'danger';
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, color, className, ...props }, ref) => {
    const isIndeterminate = value === undefined;
    const fillCls = [
      'progress-fill',
      color && color !== 'default' && `is-${color}`,
      isIndeterminate && 'is-indeterminate',
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div
        ref={ref}
        className={['progress-track', className].filter(Boolean).join(' ')}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className={fillCls}
          style={isIndeterminate ? undefined : { width: `${value}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';
