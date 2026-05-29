import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectionToolbar } from '../SelectionToolbar';
import React from 'react';

describe('SelectionToolbar', () => {
  describe('Rendering', () => {
    it('renders fromLanguage button when fromLanguage is provided', () => {
      render(<SelectionToolbar fromLanguage="English" />);
      expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
    });

    it('renders toLanguage button when toLanguage is provided', () => {
      render(<SelectionToolbar toLanguage="Spanish" />);
      expect(screen.getByRole('button', { name: /spanish/i })).toBeInTheDocument();
    });

    it('renders both language buttons when both props are provided', () => {
      render(<SelectionToolbar fromLanguage="English" toLanguage="French" />);
      expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /french/i })).toBeInTheDocument();
    });

    it('renders separator when both fromLanguage and toLanguage are present', () => {
      const { container } = render(
        <SelectionToolbar fromLanguage="English" toLanguage="French" />
      );
      const sep = container.querySelector('.sel-sep');
      expect(sep).toBeInTheDocument();
    });

    it('does not render separator when only fromLanguage is provided', () => {
      const { container } = render(<SelectionToolbar fromLanguage="English" />);
      expect(container.querySelector('.sel-sep')).not.toBeInTheDocument();
    });

    it('does not render separator when only toLanguage is provided', () => {
      const { container } = render(<SelectionToolbar toLanguage="Spanish" />);
      expect(container.querySelector('.sel-sep')).not.toBeInTheDocument();
    });

    it('renders children alongside language buttons', () => {
      render(
        <SelectionToolbar fromLanguage="English">
          <span data-testid="extra">Extra</span>
        </SelectionToolbar>
      );
      expect(screen.getByTestId('extra')).toBeInTheDocument();
    });

    it('applies selection-toolbar class to the root element', () => {
      const { container } = render(<SelectionToolbar />);
      expect(container.firstChild).toHaveClass('selection-toolbar');
    });

    it('applies custom className', () => {
      const { container } = render(<SelectionToolbar className="my-toolbar" />);
      expect(container.firstChild).toHaveClass('selection-toolbar', 'my-toolbar');
    });
  });

  describe('Interactions', () => {
    it('calls onFromClick when fromLanguage button is clicked', async () => {
      const onFromClick = vi.fn();
      const user = userEvent.setup();
      render(<SelectionToolbar fromLanguage="English" onFromClick={onFromClick} />);
      await user.click(screen.getByRole('button', { name: /english/i }));
      expect(onFromClick).toHaveBeenCalledTimes(1);
    });

    it('calls onToClick when toLanguage button is clicked', async () => {
      const onToClick = vi.fn();
      const user = userEvent.setup();
      render(<SelectionToolbar toLanguage="Spanish" onToClick={onToClick} />);
      await user.click(screen.getByRole('button', { name: /spanish/i }));
      expect(onToClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the root div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SelectionToolbar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
