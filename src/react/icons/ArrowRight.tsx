import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const ArrowRight = React.forwardRef<SVGSVGElement, IconProps>(
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
      <line x1="3" y1="10" x2="17" y2="10" />
      <polyline points="12,5 17,10 12,15" />
    </svg>
  )
);
ArrowRight.displayName = 'ArrowRight';
