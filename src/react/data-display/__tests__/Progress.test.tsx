import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Progress } from '../Progress';

describe('Progress', () => {
  it('renders with role="progressbar"', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to the value prop', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<Progress value={50} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuemin', '0');
    expect(el).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets width style on fill for determinate mode', () => {
    const { container } = render(<Progress value={40} />);
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    expect(fill).toBeTruthy();
    expect(fill.style.width).toBe('40%');
  });

  it('does not set aria-valuenow in indeterminate mode', () => {
    render(<Progress />);
    const el = screen.getByRole('progressbar');
    expect(el).not.toHaveAttribute('aria-valuenow');
  });

  it('adds is-indeterminate class when no value is provided', () => {
    const { container } = render(<Progress />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('is-indeterminate');
  });

  it('does not add is-indeterminate class when value is provided', () => {
    const { container } = render(<Progress value={60} />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).not.toHaveClass('is-indeterminate');
  });

  it('applies is-success class for success color', () => {
    const { container } = render(<Progress value={50} color="success" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('is-success');
  });

  it('applies is-info class for info color', () => {
    const { container } = render(<Progress value={50} color="info" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('is-info');
  });

  it('applies is-danger class for danger color', () => {
    const { container } = render(<Progress value={50} color="danger" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('is-danger');
  });

  it('does not apply a color modifier class for default color', () => {
    const { container } = render(<Progress value={50} color="default" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).not.toHaveClass('is-default');
    expect(fill).not.toHaveClass('is-success');
    expect(fill).not.toHaveClass('is-info');
    expect(fill).not.toHaveClass('is-danger');
  });

  it('applies progress-track class to the track element', () => {
    const { container } = render(<Progress value={50} />);
    expect(container.querySelector('.progress-track')).toBeInTheDocument();
  });

  it('merges custom className on the track', () => {
    render(<Progress value={50} className="my-progress" />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveClass('progress-track');
    expect(el).toHaveClass('my-progress');
  });

  it('forwards ref to the track div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
