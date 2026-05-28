import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';
import React from 'react';

const options = (
  <>
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
  </>
);

describe('Select', () => {
  describe('Rendering', () => {
    it('renders a native select with the select class', () => {
      render(<Select aria-label="language">{options}</Select>);
      const select = screen.getByLabelText('language');
      expect(select.tagName).toBe('SELECT');
      expect(select).toHaveClass('select');
    });

    it('renders its option children', () => {
      render(<Select aria-label="language">{options}</Select>);
      expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Español' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Français' })).toBeInTheDocument();
    });

    it('applies is-error class when error is true', () => {
      render(<Select error aria-label="language">{options}</Select>);
      expect(screen.getByLabelText('language')).toHaveClass('select', 'is-error');
    });

    it('merges custom className', () => {
      render(<Select className="wide" aria-label="language">{options}</Select>);
      expect(screen.getByLabelText('language')).toHaveClass('select', 'wide');
    });
  });

  describe('Interactions', () => {
    it('reflects the selected value', async () => {
      const user = userEvent.setup();
      render(<Select aria-label="language" defaultValue="en">{options}</Select>);
      const select = screen.getByLabelText('language') as HTMLSelectElement;
      await user.selectOptions(select, 'fr');
      expect(select.value).toBe('fr');
    });

    it('fires onChange', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Select aria-label="language" defaultValue="en" onChange={onChange}>
          {options}
        </Select>
      );
      await user.selectOptions(screen.getByLabelText('language'), 'es');
      expect(onChange).toHaveBeenCalled();
    });

    it('is disabled when disabled prop is set', () => {
      render(<Select aria-label="language" disabled>{options}</Select>);
      expect(screen.getByLabelText('language')).toBeDisabled();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} aria-label="language">{options}</Select>);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });
  });

  describe('HTML attributes', () => {
    it('passes through name and required', () => {
      render(<Select name="lang" required aria-label="language">{options}</Select>);
      const select = screen.getByLabelText('language');
      expect(select).toHaveAttribute('name', 'lang');
      expect(select).toBeRequired();
    });
  });
});
