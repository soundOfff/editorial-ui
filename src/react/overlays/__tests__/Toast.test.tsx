import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ToastProvider, useToast } from '../Toast';

// Helper component to access the toast context
const ToastTrigger: React.FC<{ onReady?: (ctx: ReturnType<typeof useToast>) => void }> = ({ onReady }) => {
  const ctx = useToast();
  React.useEffect(() => { onReady?.(ctx); }, []);
  return null;
};

describe('Toast', () => {
  describe('useToast hook', () => {
    it('throws when used outside ToastProvider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => {
        render(<ToastTrigger />);
      }).toThrow('useToast must be used within ToastProvider');
      consoleError.mockRestore();
    });

    it('returns toast, dismiss, and dismissAll functions when inside ToastProvider', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );
      expect(typeof ctx!.toast).toBe('function');
      expect(typeof ctx!.dismiss).toBe('function');
      expect(typeof ctx!.dismissAll).toBe('function');
    });
  });

  describe('toast()', () => {
    it('adds a toast to the DOM', async () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => { ctx!.toast('Hello world'); });

      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('returns an id string', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      let id: string | undefined;
      act(() => { id = ctx!.toast('Test toast'); });

      expect(typeof id).toBe('string');
      expect(id!.length).toBeGreaterThan(0);
    });
  });

  describe('dismiss()', () => {
    it('removes a toast by id', async () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      let id: string | undefined;
      act(() => { id = ctx!.toast('To be dismissed'); });

      expect(screen.getByText('To be dismissed')).toBeInTheDocument();

      act(() => { ctx!.dismiss(id!); });

      expect(screen.queryByText('To be dismissed')).not.toBeInTheDocument();
    });

    it('clicking the dismiss button removes the toast', async () => {
      const user = userEvent.setup();
      render(
        <ToastProvider>
          <ToastTrigger onReady={(ctx) => { act(() => { ctx.toast('Dismissable toast'); }); }} />
        </ToastProvider>
      );

      // Wait for toast to appear
      const dismissButton = await screen.findByRole('button', { name: /dismiss/i });
      await user.click(dismissButton);

      expect(screen.queryByText('Dismissable toast')).not.toBeInTheDocument();
    });
  });

  describe('dismissAll()', () => {
    it('removes all toasts', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => {
        ctx!.toast('Toast 1');
        ctx!.toast('Toast 2');
        ctx!.toast('Toast 3');
      });

      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
      expect(screen.getByText('Toast 3')).toBeInTheDocument();

      act(() => { ctx!.dismissAll(); });

      expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Toast 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Toast 3')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies toast-success class for success variant', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => { ctx!.toast('Saved!', { variant: 'success' }); });

      const toastEl = screen.getByRole('status');
      expect(toastEl).toHaveClass('toast', 'toast-success');
    });

    it('applies toast-warn class for warn variant', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => { ctx!.toast('Warning!', { variant: 'warn' }); });

      const toastEl = screen.getByRole('status');
      expect(toastEl).toHaveClass('toast', 'toast-warn');
    });

    it('applies toast-danger class for danger variant', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => { ctx!.toast('Error!', { variant: 'danger' }); });

      const toastEl = screen.getByRole('status');
      expect(toastEl).toHaveClass('toast', 'toast-danger');
    });

    it('applies toast-info class for info variant', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => { ctx!.toast('Info!', { variant: 'info' }); });

      const toastEl = screen.getByRole('status');
      expect(toastEl).toHaveClass('toast', 'toast-info');
    });

    it('does not apply variant class for default variant', () => {
      let ctx: ReturnType<typeof useToast> | undefined;
      render(
        <ToastProvider>
          <ToastTrigger onReady={(c) => { ctx = c; }} />
        </ToastProvider>
      );

      act(() => { ctx!.toast('Default!', { variant: 'default' }); });

      const toastEl = screen.getByRole('status');
      expect(toastEl).toHaveClass('toast');
      expect(toastEl).not.toHaveClass('toast-default');
    });
  });
});
