import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'inline' | 'quiet' | 'amber' | 'arrow' | 'danger';
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, className, children, ...props }, ref) => {
    const cls = ['link', variant && `link-${variant}`, className].filter(Boolean).join(' ');
    return <a ref={ref} className={cls} {...props}>{children}</a>;
  }
);

Link.displayName = 'Link';
