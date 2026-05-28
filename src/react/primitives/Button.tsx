import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * @default undefined (default styling)
   */
  variant?: 'amber' | 'ghost' | 'quiet' | 'danger' | 'saved' | 'icon';
  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full width button
   * @default false
   */
  block?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Button component - Editorial UI primitive
 *
 * Supports variants: amber (primary), ghost, quiet, danger, saved, icon
 * Sizes: sm, md (default), lg
 *
 * @example
 * ```tsx
 * <Button variant="amber">Save Quote</Button>
 * <Button variant="ghost" size="sm">Cancel</Button>
 * <Button variant="icon"><SearchIcon /></Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = 'md', block, disabled, className, children, ...props }, ref) => {
    const classNames = [
      'btn',
      variant && `btn-${variant}`,
      size !== 'md' && `btn-${size}`,
      block && 'btn-block',
      disabled && 'is-disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
