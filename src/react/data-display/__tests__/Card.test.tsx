import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders with default (standard) class when no variant is given', () => {
    render(<Card>Content</Card>);
    const el = screen.getByText('Content');
    expect(el).toHaveClass('card');
    expect(el).not.toHaveClass('card-quote');
    expect(el).not.toHaveClass('card-stat');
  });

  it('renders with card class for standard variant', () => {
    render(<Card variant="standard">Standard</Card>);
    const el = screen.getByText('Standard');
    expect(el).toHaveClass('card');
    expect(el).not.toHaveClass('card-quote');
    expect(el).not.toHaveClass('card-stat');
  });

  it('renders with card-quote class for quote variant', () => {
    render(<Card variant="quote">Quote</Card>);
    const el = screen.getByText('Quote');
    expect(el).toHaveClass('card-quote');
    expect(el).not.toHaveClass('card');
    expect(el).not.toHaveClass('card-stat');
  });

  it('renders with card-stat class for stat variant', () => {
    render(<Card variant="stat">Stat</Card>);
    const el = screen.getByText('Stat');
    expect(el).toHaveClass('card-stat');
    expect(el).not.toHaveClass('card');
    expect(el).not.toHaveClass('card-quote');
  });

  it('merges custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    const el = screen.getByText('Content');
    expect(el).toHaveClass('card');
    expect(el).toHaveClass('custom-class');
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders children correctly', () => {
    render(<Card><span data-testid="child">Hello</span></Card>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('passes through additional HTML attributes', () => {
    render(<Card data-testid="my-card" aria-label="Card">Content</Card>);
    const el = screen.getByTestId('my-card');
    expect(el).toHaveAttribute('aria-label', 'Card');
  });
});
