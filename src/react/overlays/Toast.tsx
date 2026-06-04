'use client';

import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

export interface ToastItem {
  id: string;
  message: React.ReactNode;
  variant?: 'default' | 'success' | 'warn' | 'danger' | 'info';
  duration?: number;
}

interface ToastContextValue {
  toast: (message: React.ReactNode, options?: Omit<ToastItem, 'id' | 'message'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const toast = useCallback((message: React.ReactNode, options?: Omit<ToastItem, 'id' | 'message'>): string => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, message, duration: 4000, ...options };
    setToasts(prev => [...prev, item]);
    if (item.duration && item.duration > 0) {
      setTimeout(() => dismiss(id), item.duration);
    }
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      {ReactDOM.createPortal(
        <div className="toaster" role="region" aria-label="Notifications" aria-live="polite">
          {toasts.map(t => (
            <div key={t.id} className={['toast', t.variant && t.variant !== 'default' && `toast-${t.variant}`].filter(Boolean).join(' ')} role="status">
              <span>{t.message}</span>
              <button className="toast-dismiss" onClick={() => dismiss(t.id)} aria-label="Dismiss">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/>
                </svg>
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const Toaster: React.FC = () => null;
