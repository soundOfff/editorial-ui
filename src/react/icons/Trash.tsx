import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Trash = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, strokeWidth = 1.6, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="4,6 16,6" />
      <path d="M7,6 V16 h6 V6" />
      <path d="M8,6 V4 h4 V6" />
    </svg>
  )
);
Trash.displayName = 'Trash';
