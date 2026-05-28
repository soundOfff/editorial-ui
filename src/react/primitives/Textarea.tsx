import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Error state — applies the is-error styling.
   * @default false
   */
  error?: boolean;
  /**
   * Resize behavior. Overrides the default vertical resize from CSS.
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Textarea component - Editorial UI primitive
 *
 * Multi-line text input. Resizes vertically by default; pass `resize` to change.
 *
 * @example
 * ```tsx
 * <Textarea rows={4} placeholder="Notes…" />
 * <Textarea resize="none" error />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, resize, className, style, ...props }, ref) => {
    const classNames = ['textarea', error && 'is-error', className]
      .filter(Boolean)
      .join(' ');

    return (
      <textarea
        ref={ref}
        className={classNames}
        style={resize ? { resize, ...style } : style}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
