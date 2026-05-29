import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Kbd } from '../Kbd';

describe('Kbd', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Kbd>Ctrl+K</Kbd>);
      expect(screen.getByText('Ctrl+K')).toBeInTheDocument();
    });

    it('applies default kbd class', () => {
      render(<Kbd>Enter</Kbd>);
      expect(screen.getByText('Enter')).toHaveClass('kbd');
    });

    it('renders as a kbd element', () => {
      render(<Kbd>Esc</Kbd>);
      expect(screen.getByText('Esc').tagName.toLowerCase()).toBe('kbd');
    });

    it('applies custom className', () => {
      render(<Kbd className="custom">Tab</Kbd>);
      expect(screen.getByText('Tab')).toHaveClass('kbd', 'custom');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to kbd element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Kbd ref={ref}>Shift</Kbd>);
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName.toLowerCase()).toBe('kbd');
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(<Kbd data-testid="kbd-enter">Enter</Kbd>);
      expect(screen.getByTestId('kbd-enter')).toBeInTheDocument();
    });
  });
});
