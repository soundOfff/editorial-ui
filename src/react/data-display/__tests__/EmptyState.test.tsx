import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';
import React from 'react';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<EmptyState title="No results found" />);
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('renders the icon when provided', () => {
      render(<EmptyState title="Empty" icon={<span data-testid="icon">📭</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('does not render icon container when icon is omitted', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector('.empty-state-icon')).not.toBeInTheDocument();
    });

    it('renders the description when provided', () => {
      render(<EmptyState title="Empty" description="Try adjusting your filters." />);
      expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
    });

    it('does not render description element when description is omitted', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector('.empty-state-description')).not.toBeInTheDocument();
    });

    it('renders the action when provided', () => {
      render(
        <EmptyState title="Empty" action={<button>Add item</button>} />
      );
      expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
    });

    it('does not render action container when action is omitted', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector('.empty-state-action')).not.toBeInTheDocument();
    });

    it('applies empty-state class to root element', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.firstChild).toHaveClass('empty-state');
    });

    it('applies custom className', () => {
      const { container } = render(<EmptyState title="Empty" className="my-empty" />);
      expect(container.firstChild).toHaveClass('empty-state', 'my-empty');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the root div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<EmptyState ref={ref} title="Empty" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
