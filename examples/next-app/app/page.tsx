import { Button, Input, Checkbox } from 'editorial-ui';

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
          Editorial UI
        </h1>
        <p style={{ marginTop: 8, color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          Next.js 14 App Router — component showcase
        </p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="amber">Save</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="quiet">Learn more</Button>
          <Button variant="danger">Delete</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Inputs</h2>
        <Input placeholder="Search..." />
        <Input placeholder="Disabled input" disabled />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Form Controls</h2>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 13 }}>
          <Checkbox defaultChecked /> Remember me
        </label>
      </section>
    </main>
  );
}
