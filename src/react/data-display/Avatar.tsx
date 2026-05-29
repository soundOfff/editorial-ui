import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ initials, size, className, ...props }, ref) => (
    <span
      ref={ref}
      className={[
        'avatar',
        size && size !== 'md' && `avatar-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {initials}
    </span>
  )
);

Avatar.displayName = 'Avatar';
