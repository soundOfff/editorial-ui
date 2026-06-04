'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement> & { title?: string; onClose?: () => void }> = ({ title, onClose, children, className, ...props }) => (
  <div className={['modal-header', className].filter(Boolean).join(' ')} {...props}>
    {title && <span className="modal-title">{title}</span>}
    {children}
    {onClose && (
      <button className="modal-close" onClick={onClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>
        </svg>
      </button>
    )}
  </div>
);
ModalHeader.displayName = 'Modal.Header';

const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={['modal-body', className].filter(Boolean).join(' ')} {...props}>{children}</div>
);
ModalBody.displayName = 'Modal.Body';

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={['modal-footer', className].filter(Boolean).join(' ')} {...props}>{children}</div>
);
ModalFooter.displayName = 'Modal.Footer';

interface ModalComponent extends React.FC<ModalProps> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

const ModalBase: React.FC<ModalProps> = ({ open, onClose, children, className }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key !== 'Tab') return;
    const modal = backdropRef.current?.querySelector('.modal');
    if (!modal) return;
    const focusable = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [open, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      const modal = backdropRef.current?.querySelector('.modal');
      const first = modal?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" ref={backdropRef} onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}>
      <div className={['modal', className].filter(Boolean).join(' ')} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>,
    document.body
  );
};

export const Modal = ModalBase as ModalComponent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
