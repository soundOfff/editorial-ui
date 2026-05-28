import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../Switch';
import React from 'react';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders with role="switch" and an accessible label from children', () => {
      render(<Switch>Show streak</Switch>);
      expect(screen.getByRole('switch', { name: 'Show streak' })).toBeInTheDocument();
    });

    it('applies the switch class to the wrapping label', () => {
      const { container } = render(<Switch>Label</Switch>);
      expect(container.querySelector('label')).toHaveClass('switch');
    });

    it('merges custom className onto the label', () => {
      const { container } = render(<Switch className="dense">Label</Switch>);
      expect(container.querySelector('label')).toHaveClass('switch', 'dense');
    });

    it('reflects defaultChecked', () => {
      render(<Switch defaultChecked>On</Switch>);
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('allows overriding the role', () => {
      render(<Switch role="checkbox">Label</Switch>);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.queryByRole('switch')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard & interaction', () => {
    it('toggles with the Space key when focused', async () => {
      const user = userEvent.setup();
      render(<Switch>Toggle</Switch>);
      const sw = screen.getByRole('switch');
      sw.focus();
      expect(sw).toHaveFocus();
      await user.keyboard(' ');
      expect(sw).toBeChecked();
      await user.keyboard(' ');
      expect(sw).not.toBeChecked();
    });

    it('toggles on click and fires onChange', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onChange={onChange}>Toggle</Switch>);
      await user.click(screen.getByRole('switch'));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Switch disabled>Toggle</Switch>);
      const sw = screen.getByRole('switch');
      await user.click(sw);
      expect(sw).not.toBeChecked();
      expect(sw).toBeDisabled();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref}>Label</Switch>);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });
  });
});
