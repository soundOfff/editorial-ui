import React from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /**
   * Error state — applies the is-error styling (ignored when prefix/suffix
   * render the input inside an input-group).
   * @default false
   */
  error?: boolean;
  /**
   * Content rendered as a left affix inside an input-group (icon, label, unit).
   * Presence switches rendering to the input-group layout.
   */
  prefix?: React.ReactNode;
  /**
   * Content rendered as a right affix inside an input-group (icon, label, unit).
   * Presence switches rendering to the input-group layout.
   */
  suffix?: React.ReactNode;
}

/**
 * Input component - Editorial UI primitive
 *
 * A plain text input, or — when given `prefix`/`suffix` — an input-group with
 * mono affixes for search icons, unit labels, and the like.
 *
 * @example
 * ```tsx
 * <Input placeholder="Search…" prefix={<SearchIcon />} />
 * <Input type="number" suffix="px" />
 * <Input error aria-invalid />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, prefix, suffix, className, ...props }, ref) => {
    if (prefix != null || suffix != null) {
      const groupClassNames = ['input-group', className].filter(Boolean).join(' ');
      return (
        <div className={groupClassNames}>
          {prefix != null && <span className="affix">{prefix}</span>}
          <input ref={ref} {...props} />
          {suffix != null && <span className="affix r">{suffix}</span>}
        </div>
      );
    }

    const classNames = ['input', error && 'is-error', className]
      .filter(Boolean)
      .join(' ');

    return <input ref={ref} className={classNames} {...props} />;
  }
);

Input.displayName = 'Input';
