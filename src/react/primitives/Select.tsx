import React from 'react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Error state — applies the is-error styling.
   * @default false
   */
  error?: boolean;
}

/**
 * Select component - Editorial UI primitive
 *
 * A native `<select>` styled with a CSS-painted chevron. Options are passed as
 * children; this is deliberately not a custom dropdown.
 *
 * @example
 * ```tsx
 * <Select defaultValue="en">
 *   <option value="en">English</option>
 *   <option value="es">Español</option>
 * </Select>
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...props }, ref) => {
    const classNames = ['select', error && 'is-error', className]
      .filter(Boolean)
      .join(' ');

    return (
      <select ref={ref} className={classNames} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
