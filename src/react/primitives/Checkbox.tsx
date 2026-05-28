import React from 'react';

export interface CheckboxProps
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
 * Checkbox component - Editorial UI primitive
 *
 * A real `<input type="checkbox">` (visually hidden, still focusable) with a
 * styled box that fills amber when checked. Keyboard support — Tab to focus,
 * Space to toggle — comes for free from the native input.
 *
 * @example
 * ```tsx
 * <Checkbox defaultChecked>Save to default collection</Checkbox>
 * <Checkbox aria-label="Select row" />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, ...props }, ref) => {
    const classNames = ['check', className].filter(Boolean).join(' ');
    return (
      <label className={classNames}>
        <input type="checkbox" ref={ref} {...props} />
        <span className="box">
          <svg width="11" height="11" viewBox="0 0 24 24" style={{ color: '#2A1A05' }}>
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12.5 10 17.5 19.5 7"
            />
          </svg>
        </span>
        {children != null && <span>{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
