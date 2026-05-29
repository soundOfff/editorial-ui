import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from '../Link';
import React from 'react';

describe('Link', () => {
  describe('Rendering', () => {
    it('renders as an anchor element', () => {
      render(<Link href="https://example.com">Click me</Link>);
      const link = screen.getByRole('link', { name: /click me/i });
      expect(link.tagName).toBe('A');
    });

    it('applies base link class', () => {
      const { container } = render(<Link>Base link</Link>);
      const link = container.querySelector('a');
      expect(link).toHaveClass('link');
    });

    it('applies correct class for each variant', () => {
      const variants: Array<'inline' | 'quiet' | 'amber' | 'arrow' | 'danger'> = [
        'inline',
        'quiet',
        'amber',
        'arrow',
        'danger',
      ];

      variants.forEach((variant) => {
        const { container, unmount } = render(<Link variant={variant}>{variant}</Link>);
        const link = container.querySelector('a');
        expect(link).toHaveClass('link', `link-${variant}`);
        unmount();
      });
    });

    it('applies no variant class when variant is omitted', () => {
      const { container } = render(<Link>No variant</Link>);
      const link = container.querySelector('a');
      expect(link).toHaveClass('link');
      expect(link?.className).toBe('link');
    });

    it('applies custom className alongside link class', () => {
      const { container } = render(<Link className="custom-cls">Styled</Link>);
      const link = container.querySelector('a');
      expect(link).toHaveClass('link', 'custom-cls');
    });
  });

  describe('href passthrough', () => {
    it('passes href to the anchor element', () => {
      render(<Link href="https://example.com">Visit</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    });

    it('passes target and rel attributes', () => {
      render(
        <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
          External
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the anchor element', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(<Link ref={ref}>Ref link</Link>);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe('A');
    });
  });
});
