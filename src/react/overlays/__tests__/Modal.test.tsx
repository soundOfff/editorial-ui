import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

describe('Modal', () => {
  describe('Rendering', () => {
    it('is not rendered when open=false', () => {
      render(<Modal open={false} onClose={() => {}}><div>Content</div></Modal>);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('is rendered when open=true', () => {
      render(<Modal open={true} onClose={() => {}}><div>Content</div></Modal>);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal attribute when open', () => {
      render(<Modal open={true} onClose={() => {}}><div>Content</div></Modal>);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('applies custom className to modal', () => {
      render(<Modal open={true} onClose={() => {}} className="custom-modal"><div>Content</div></Modal>);
      expect(screen.getByRole('dialog')).toHaveClass('modal', 'custom-modal');
    });
  });

  describe('Keyboard interaction', () => {
    it('calls onClose when Escape key is pressed', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      render(<Modal open={true} onClose={onClose}><div>Content</div></Modal>);
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('wraps Tab from last focusable element to first', async () => {
      const user = userEvent.setup();
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header title="Test" onClose={() => {}} />
          <Modal.Body>
            <button>First</button>
            <button>Second</button>
          </Modal.Body>
          <Modal.Footer>
            <button>Last</button>
          </Modal.Footer>
        </Modal>
      );

      // Get all focusable elements inside the modal
      const focusableElements = screen.getAllByRole('button');
      const lastButton = focusableElements[focusableElements.length - 1]!;

      // Focus the last button
      lastButton.focus();
      expect(lastButton).toHaveFocus();

      // Tab from last should wrap to first
      await user.keyboard('{Tab}');
      expect(focusableElements[0]!).toHaveFocus();
    });
  });

  describe('Backdrop interaction', () => {
    it('calls onClose when backdrop is clicked', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      const { container } = render(
        <Modal open={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      const backdrop = container.ownerDocument.querySelector('.modal-backdrop') as HTMLElement;
      expect(backdrop).toBeInTheDocument();

      // Click the backdrop element directly
      await user.click(backdrop);
      // Note: clicking on backdrop only fires if the target IS the backdrop
      // userEvent.click on the backdrop element triggers it
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Compound components', () => {
    it('Modal.Header renders title and children', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header title="My Title">Extra content</Modal.Header>
        </Modal>
      );
      expect(screen.getByText('My Title')).toBeInTheDocument();
      expect(screen.getByText('Extra content')).toBeInTheDocument();
    });

    it('Modal.Header renders close button when onClose is provided', () => {
      const onClose = vi.fn();
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header title="Test" onClose={onClose} />
        </Modal>
      );
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('Modal.Body renders children', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Body>Body content</Modal.Body>
        </Modal>
      );
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('Modal.Footer renders children', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Footer>
            <button>Cancel</button>
            <button>Confirm</button>
          </Modal.Footer>
        </Modal>
      );
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });

    it('Modal.Header has correct CSS class', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header data-testid="header">Header</Modal.Header>
        </Modal>
      );
      expect(screen.getByTestId('header')).toHaveClass('modal-header');
    });

    it('Modal.Body has correct CSS class', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Body data-testid="body">Body</Modal.Body>
        </Modal>
      );
      expect(screen.getByTestId('body')).toHaveClass('modal-body');
    });

    it('Modal.Footer has correct CSS class', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Footer data-testid="footer">Footer</Modal.Footer>
        </Modal>
      );
      expect(screen.getByTestId('footer')).toHaveClass('modal-footer');
    });
  });
});
