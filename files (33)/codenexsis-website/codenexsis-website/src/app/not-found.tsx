import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(239,43,61,0.15), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 22vw, 18rem)',
            fontWeight: 600,
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            background: 'linear-gradient(135deg, #ff4258, #b8101f)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
          }}
        >
          That route doesn&apos;t exist.
        </h1>
        <p
          style={{
            color: 'var(--text-2)',
            maxWidth: 480,
            margin: '0 auto 2.5rem',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for has been moved, deleted, or never existed.
          Let&apos;s get you back on track.
        </p>
        <div style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <Link href="/services" className="btn btn-ghost">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
