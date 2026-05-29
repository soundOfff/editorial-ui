import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Bell = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M10,2 C7,2 5,5 5,8 v5 l-1,1 h12 l-1,-1 V8 C15,5 13,2 10,2" />
      <line x1="8.5" y1="17" x2="11.5" y2="17" />
    </svg>
  )
);
Bell.displayName = 'Bell';
