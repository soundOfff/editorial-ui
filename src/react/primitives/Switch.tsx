import React from 'react';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Class applied to the wrapping label (the visual root).
   */
  className?: string;
  /**
   * Visible label content. Omit and pass aria-label for an unlabeled control.
   */
  children?: React.ReactNode;
}

/**
 * Switch component - Editorial UI primitive
 *
 * A real `<input type="checkbox">` exposed with `role="switch"` and a sliding
 * amber track. Tab to focus, Space to toggle — native input behavior.
 *
 * @example
 * ```tsx
 * <Switch defaultChecked>Show streak in toolbar</Switch>
 * <Switch aria-label="Beta features" />
 * ```
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, children, role = 'switch', ...props }, ref) => {
    const classNames = ['switch', className].filter(Boolean).join(' ');
    return (
      <label className={classNames}>
        <input type="checkbox" role={role} ref={ref} {...props} />
        <span className="track" />
        {children != null && <span>{children}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
