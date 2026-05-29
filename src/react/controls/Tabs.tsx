import React, { useRef, useCallback } from 'react';

export interface TabItem { id: string; label: React.ReactNode; }
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ items, activeId, onChange, className, ...props }, ref) => {
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (idx + 1) % items.length;
        tabRefs.current[next]?.focus();
        onChange(items[next]!.id);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (idx - 1 + items.length) % items.length;
        tabRefs.current[prev]?.focus();
        onChange(items[prev]!.id);
      }
    }, [items, onChange]);

    return (
      <div ref={ref} className={['tabs', className].filter(Boolean).join(' ')} role="tablist" {...props}>
        {items.map((item, idx) => (
          <button
            key={item.id}
            ref={el => { tabRefs.current[idx] = el; }}
            role="tab"
            aria-selected={activeId === item.id}
            className={['tab-item', activeId === item.id && 'is-active'].filter(Boolean).join(' ')}
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
Tabs.displayName = 'Tabs';
