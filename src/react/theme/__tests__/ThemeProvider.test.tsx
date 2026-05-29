import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { accentPresets } from '../presets';

describe('ThemeProvider', () => {
  describe('theme attribute', () => {
    it('sets data-theme="dark" when theme="dark"', () => {
      const { container } = render(
        <ThemeProvider theme="dark">
          <span>content</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.getAttribute('data-theme')).toBe('dark');
    });

    it('sets data-theme="light" when theme="light"', () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <span>content</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.getAttribute('data-theme')).toBe('light');
    });

    it('does NOT set data-theme when theme="auto" (default)', () => {
      const { container } = render(
        <ThemeProvider>
          <span>content</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.hasAttribute('data-theme')).toBe(false);
    });

    it('does NOT set data-theme when theme is explicitly "auto"', () => {
      const { container } = render(
        <ThemeProvider theme="auto">
          <span>content</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.hasAttribute('data-theme')).toBe(false);
    });
  });

  describe('accent CSS variables', () => {
    it('injects --amber, --amber-deep, --amber-soft when accent=accentPresets.sage', () => {
      const { container } = render(
        <ThemeProvider accent={accentPresets.sage}>
          <span>content</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--amber')).toBe(accentPresets.sage[0]);
      expect(wrapper.style.getPropertyValue('--amber-deep')).toBe(accentPresets.sage[1]);
      expect(wrapper.style.getPropertyValue('--amber-soft')).toBe(accentPresets.sage[2]);
    });

    it('leaves CSS variables unset when no accent prop is provided', () => {
      const { container } = render(
        <ThemeProvider>
          <span>content</span>
        </ThemeProvider>
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--amber')).toBe('');
      expect(wrapper.style.getPropertyValue('--amber-deep')).toBe('');
      expect(wrapper.style.getPropertyValue('--amber-soft')).toBe('');
    });
  });

  describe('accentPresets', () => {
    it('has exactly 5 keys: amber, terracotta, sage, indigo, plum', () => {
      const keys = Object.keys(accentPresets);
      expect(keys).toHaveLength(5);
      expect(keys).toContain('amber');
      expect(keys).toContain('terracotta');
      expect(keys).toContain('sage');
      expect(keys).toContain('indigo');
      expect(keys).toContain('plum');
    });

    it('each preset tuple has exactly 3 strings', () => {
      for (const [name, tuple] of Object.entries(accentPresets)) {
        expect(Array.isArray(tuple), `${name} should be an array`).toBe(true);
        expect(tuple).toHaveLength(3);
        for (const value of tuple) {
          expect(typeof value, `${name} value should be a string`).toBe('string');
        }
      }
    });
  });
});
