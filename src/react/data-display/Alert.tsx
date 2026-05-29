import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warn' | 'danger';
  message?: React.ReactNode;
  compact?: boolean;
}

const AlertIcon: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...props }) => (
  <span className={['alert-icon', className].filter(Boolean).join(' ')} {...props}>{children}</span>
);
AlertIcon.displayName = 'Alert.Icon';

const AlertMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={['alert-message', className].filter(Boolean).join(' ')} {...props}>{children}</div>
);
AlertMessage.displayName = 'Alert.Message';

interface AlertComponent extends React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>> {
  Icon: typeof AlertIcon;
  Message: typeof AlertMessage;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, message, compact, className, children, ...props }, ref) => {
    const cls = ['alert', variant && `is-${variant}`, compact && 'is-compact', className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={cls} role="alert" {...props}>
        {message !== undefined ? (
          <AlertMessage>{message}</AlertMessage>
        ) : (
          children
        )}
      </div>
    );
  }
) as AlertComponent;

Alert.displayName = 'Alert';
Alert.Icon = AlertIcon;
Alert.Message = AlertMessage;
