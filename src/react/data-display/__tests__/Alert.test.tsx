import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from '../Alert';

describe('Alert', () => {
  describe('Simple API', () => {
    it('renders message text', () => {
      render(<Alert message="Saved successfully" />);
      expect(screen.getByText('Saved successfully')).toBeInTheDocument();
    });

    it('wraps message in alert-message div', () => {
      render(<Alert message="Hello" />);
      const msg = screen.getByText('Hello');
      expect(msg).toHaveClass('alert-message');
    });
  });

  describe('Compound API', () => {
    it('renders custom children with Alert.Icon and Alert.Message', () => {
      render(
        <Alert variant="info">
          <Alert.Icon>ℹ</Alert.Icon>
          <Alert.Message>Custom <strong>bold</strong> text</Alert.Message>
        </Alert>
      );
      expect(screen.getByText('ℹ')).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
    });

    it('Alert.Icon has alert-icon class', () => {
      render(
        <Alert>
          <Alert.Icon data-testid="icon">!</Alert.Icon>
          <Alert.Message>msg</Alert.Message>
        </Alert>
      );
      expect(screen.getByTestId('icon')).toHaveClass('alert-icon');
    });

    it('Alert.Message has alert-message class', () => {
      render(
        <Alert>
          <Alert.Message data-testid="msg">text</Alert.Message>
        </Alert>
      );
      expect(screen.getByTestId('msg')).toHaveClass('alert-message');
    });
  });

  describe('variant prop', () => {
    it('applies is-info class for info variant', () => {
      render(<Alert variant="info" message="info" />);
      expect(screen.getByRole('alert')).toHaveClass('alert', 'is-info');
    });

    it('applies is-success class for success variant', () => {
      render(<Alert variant="success" message="success" />);
      expect(screen.getByRole('alert')).toHaveClass('alert', 'is-success');
    });

    it('applies is-warn class for warn variant', () => {
      render(<Alert variant="warn" message="warn" />);
      expect(screen.getByRole('alert')).toHaveClass('alert', 'is-warn');
    });

    it('applies is-danger class for danger variant', () => {
      render(<Alert variant="danger" message="danger" />);
      expect(screen.getByRole('alert')).toHaveClass('alert', 'is-danger');
    });

    it('renders without a variant class when variant is not provided', () => {
      render(<Alert message="default" />);
      const el = screen.getByRole('alert');
      expect(el).toHaveClass('alert');
      expect(el.className).toBe('alert');
    });
  });

  describe('compact prop', () => {
    it('applies is-compact class when compact is true', () => {
      render(<Alert compact message="compact" />);
      expect(screen.getByRole('alert')).toHaveClass('is-compact');
    });

    it('does not apply is-compact when compact is false', () => {
      render(<Alert compact={false} message="not compact" />);
      expect(screen.getByRole('alert')).not.toHaveClass('is-compact');
    });
  });

  describe('accessibility', () => {
    it('has role="alert"', () => {
      render(<Alert message="accessible" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('merges custom className with base classes', () => {
      render(<Alert className="my-custom" message="test" />);
      const el = screen.getByRole('alert');
      expect(el).toHaveClass('alert', 'my-custom');
    });
  });
});
