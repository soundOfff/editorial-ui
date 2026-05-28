import React from 'react';

export interface RadioProps
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
 * Radio component - Editorial UI primitive
 *
 * A real `<input type="radio">` (visually hidden, still focusable) with a
 * styled dot. Group radios by sharing a `name`; arrow-key navigation and
 * Space/Tab come from the native input.
 *
 * @example
 * ```tsx
 * <Radio name="mode" value="quiet" defaultChecked>Quiet</Radio>
 * <Radio name="mode" value="standard">Standard</Radio>
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, children, ...props }, ref) => {
    const classNames = ['radio', className].filter(Boolean).join(' ');
    return (
      <label className={classNames}>
        <input type="radio" ref={ref} {...props} />
        <span className="dot" />
        {children != null && <span>{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
