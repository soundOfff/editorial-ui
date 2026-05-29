import React, { useRef, useCallback } from 'react';

export interface SegItem { id: string; label: React.ReactNode; }
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: SegItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ items, activeId, onChange, className, ...props }, ref) => {
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (idx + 1) % items.length;
        itemRefs.current[next]?.focus();
        onChange(items[next]!.id);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (idx - 1 + items.length) % items.length;
        itemRefs.current[prev]?.focus();
        onChange(items[prev]!.id);
      }
    }, [items, onChange]);

    return (
      <div
        ref={ref}
        className={['segmented-control', className].filter(Boolean).join(' ')}
        role="group"
        {...props}
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            ref={el => { itemRefs.current[idx] = el; }}
            role="radio"
            aria-checked={activeId === item.id}
            className={['seg-item', activeId === item.id && 'is-active'].filter(Boolean).join(' ')}
            onClick={() => onChange(item.id)}
            onKeyDown={e => handleKeyDown(e, idx)}
            tabIndex={activeId === item.id ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
);
SegmentedControl.displayName = 'SegmentedControl';
