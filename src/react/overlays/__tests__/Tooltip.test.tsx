import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('attaches data-tip attribute to the child element', () => {
    render(
      <Tooltip tip="Save document">
        <button>Save</button>
      </Tooltip>
    );
    const btn = screen.getByRole('button', { name: /save/i });
    expect(btn).toHaveAttribute('data-tip', 'Save document');
  });

  it('tip text matches the provided tip prop', () => {
    const tip = 'This is a tooltip';
    render(
      <Tooltip tip={tip}>
        <span data-testid="target">Hover me</span>
      </Tooltip>
    );
    const target = screen.getByTestId('target');
    expect(target.getAttribute('data-tip')).toBe(tip);
  });

  it('renders children unchanged aside from data-tip', () => {
    render(
      <Tooltip tip="Info">
        <button data-testid="child-btn">Action</button>
      </Tooltip>
    );
    expect(screen.getByTestId('child-btn')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('works with anchor elements', () => {
    render(
      <Tooltip tip="Go home">
        <a href="/" data-testid="anchor">Home</a>
      </Tooltip>
    );
    expect(screen.getByTestId('anchor')).toHaveAttribute('data-tip', 'Go home');
  });
});
