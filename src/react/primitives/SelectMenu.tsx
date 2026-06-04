'use client';

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Check } from '../icons/Check';
import { ChevronDown } from '../icons/ChevronDown';
import { Search } from '../icons/Search';

export interface SelectMenuOption {
  /** Value reported to onChange and matched against `value`. */
  value: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Optional trailing micro-label, e.g. an ISO code. */
  suffix?: React.ReactNode;
  /** Disable selection of this option. */
  disabled?: boolean;
  /**
   * Text used for filtering / typeahead. Defaults to `label` when it is a
   * string; supply this when the label is a node.
   */
  keywords?: string;
}

export interface SelectMenuProps {
  options: SelectMenuOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Shown on the trigger when nothing is selected. */
  placeholder?: string;
  /** Optional mono heading inside the popover. */
  heading?: string;
  /** Show a filter input inside the popover. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Text shown when a filter matches no options. */
  emptyMessage?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

function optionText(o: SelectMenuOption): string {
  if (o.keywords != null) return o.keywords;
  return typeof o.label === 'string' ? o.label : '';
}

/**
 * SelectMenu — Editorial UI custom listbox.
 *
 * A styled dropdown alternative to the native `Select`, for long or
 * richly-labelled lists with optional filtering. The trigger mirrors the input
 * chrome; the popover reuses the popup shell. Supports controlled and
 * uncontrolled use, keyboard navigation, and click-outside / Escape dismissal.
 *
 * @example
 * ```tsx
 * <SelectMenu
 *   heading="Translate to"
 *   searchable
 *   defaultValue="es"
 *   options={[
 *     { value: 'es', label: 'Spanish', suffix: 'ES' },
 *     { value: 'pt', label: 'Portuguese', suffix: 'PT' },
 *   ]}
 *   onChange={(v) => console.log(v)}
 * />
 * ```
 */
export const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  heading,
  searchable = false,
  searchPlaceholder = 'Filter…',
  emptyMessage = 'No matches',
  disabled = false,
  error = false,
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  const reactId = useId();
  const baseId = id ?? reactId;
  const listId = `${baseId}-list`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!searchable || query.trim() === '') return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) => optionText(o).toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, query, searchable]);

  const selectedOption = options.find((o) => o.value === currentValue);

  const firstEnabled = useCallback(
    (from: number, dir: 1 | -1): number => {
      const n = filtered.length;
      if (n === 0) return -1;
      let i = from;
      for (let step = 0; step < n; step++) {
        if (i >= 0 && i < n && !filtered[i]!.disabled) return i;
        i += dir;
        if (i < 0) i = n - 1;
        if (i >= n) i = 0;
      }
      return -1;
    },
    [filtered]
  );

  const closeMenu = useCallback((refocus = true) => {
    setOpen(false);
    setQuery('');
    if (refocus) triggerRef.current?.focus();
  }, []);

  const commit = useCallback(
    (option?: SelectMenuOption) => {
      if (!option || option.disabled) return;
      if (!isControlled) setInternalValue(option.value);
      onChange?.(option.value);
      closeMenu();
    },
    [isControlled, onChange, closeMenu]
  );

  // Open: highlight the selected option (or first enabled) and move focus inside.
  useEffect(() => {
    if (!open) return;
    const selectedIdx = filtered.findIndex((o) => o.value === currentValue);
    setHighlight(selectedIdx >= 0 ? selectedIdx : firstEnabled(0, 1));
    const focusTarget = searchable ? searchRef.current : listRef.current;
    // Defer so the popover is mounted before focusing.
    const raf = requestAnimationFrame(() => focusTarget?.focus());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Re-anchor the highlight whenever the filtered set changes.
  useEffect(() => {
    if (open) setHighlight((h) => (h >= 0 && h < filtered.length ? h : firstEnabled(0, 1)));
  }, [filtered, open, firstEnabled]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!open || highlight < 0) return;
    const el = document.getElementById(`${baseId}-opt-${highlight}`);
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [highlight, open, baseId]);

  // Dismiss on outside pointer-down or Escape, regardless of focus location.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeMenu(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeMenu]);

  const move = useCallback(
    (dir: 1 | -1) => {
      setHighlight((h) => {
        const start = h < 0 ? (dir === 1 ? 0 : filtered.length - 1) : h + dir;
        return firstEnabled((start + filtered.length) % filtered.length, dir);
      });
    },
    [filtered.length, firstEnabled]
  );

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (open) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        move(-1);
        break;
      case 'Home':
        e.preventDefault();
        setHighlight(firstEnabled(0, 1));
        break;
      case 'End':
        e.preventDefault();
        setHighlight(firstEnabled(filtered.length - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        commit(filtered[highlight]);
        break;
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'Tab':
        closeMenu(false);
        break;
    }
  };

  const triggerClass = [
    'select-menu-trigger',
    open && 'is-open',
    !selectedOption && 'is-placeholder',
    error && 'is-error',
  ]
    .filter(Boolean)
    .join(' ');

  const activeId = open && highlight >= 0 ? `${baseId}-opt-${highlight}` : undefined;

  return (
    <div ref={rootRef} className={['select-menu', className].filter(Boolean).join(' ')}>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="select-menu-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="select-menu-chevron" size={16} aria-hidden />
      </button>

      {open && (
        <div className="select-menu-popover">
          {heading && <div className="select-menu-heading">{heading}</div>}

          {searchable && (
            <div className="input-search select-menu-search">
              <Search size={13} aria-hidden />
              <input
                ref={searchRef}
                className="input"
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                aria-label={ariaLabel ? `${ariaLabel} filter` : 'Filter options'}
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onMenuKeyDown}
              />
            </div>
          )}

          <div
            ref={listRef}
            id={listId}
            className="select-menu-list"
            role="listbox"
            aria-label={ariaLabel}
            aria-activedescendant={searchable ? undefined : activeId}
            tabIndex={searchable ? undefined : -1}
            onKeyDown={searchable ? undefined : onMenuKeyDown}
          >
            {filtered.length === 0 && <div className="select-menu-empty">{emptyMessage}</div>}
            {filtered.map((o, idx) => {
              const selected = o.value === currentValue;
              const optionClass = [
                'select-menu-option',
                selected && 'is-selected',
                idx === highlight && 'is-highlighted',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div
                  key={o.value}
                  id={`${baseId}-opt-${idx}`}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={o.disabled || undefined}
                  className={optionClass}
                  onClick={() => commit(o)}
                  onMouseEnter={() => !o.disabled && setHighlight(idx)}
                >
                  <span className="select-menu-option-main">
                    <Check className="select-menu-check" size={13} aria-hidden />
                    <span>{o.label}</span>
                  </span>
                  {o.suffix != null && <span className="select-menu-suffix">{o.suffix}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

SelectMenu.displayName = 'SelectMenu';
