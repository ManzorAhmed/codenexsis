'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import styles from './Hero.module.css';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });

const rotatingServices = [
  'mobile applications',
  'CRM platforms',
  'ERP systems',
  'AI models',
  'cybersecurity',
  'IT networks',
  'cloud platforms',
  'SaaS products',
  'SEO growth',
];

const ROTATE_INTERVAL_MS = 2800;
const headlineWords = ['We', 'engineer'];

/* Magnetic button wrapper - follows cursor subtly */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.18;
    const dy = (e.clientY - cy) * 0.18;
    setPos({ x: dx, y: dy });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={styles.magneticBtn}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [serviceIndex, setServiceIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const id = setInterval(() => {
      setServiceIndex((i) => (i + 1) % rotatingServices.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.bg}>
        <div className="grid-fade" />
      </div>
      <motion.div className={styles.glow1} style={{ y: glowY }} />

      <motion.div className={styles.scene} style={{ scale: sceneScale, opacity: sceneOpacity }}>
        <HeroScene scrollMv={scrollYProgress} activeService={serviceIndex} />
      </motion.div>
      <div className={styles.sceneFade} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
          {/* Eyebrow */}
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.eyebrowDot} />
            <span>
              Codenexsis Technologies <span className={styles.eyebrowAccent}>· Est. 2019, UAE</span>
            </span>
          </motion.div>

          {/* Headline — word-by-word entrance */}
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  className={styles.headlineWord}
                  initial={{ opacity: 0, y: '110%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.25 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            <span className={`${styles.headlineLine} ${styles.headlineLineRotate}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={serviceIndex}
                  className={styles.headlineRotate}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {rotatingServices[serviceIndex]}.
                  <motion.span
                    className={styles.headlineUnderline}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%' }}
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subline */}
          <motion.p
            className={styles.subline}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            A senior engineering studio in Abu Dhabi. Custom software, proprietary AI,
            cybersecurity, cloud, and IT — engineered as one stack.
          </motion.p>

          {/* Pillars */}
          <motion.div
            className={styles.pillars}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className={styles.pillar}>
              <span className={styles.pillarDot} /> Build
            </span>
            <span className={styles.pillarSep} />
            <span className={styles.pillar}>
              <span className={styles.pillarDot} /> Secure
            </span>
            <span className={styles.pillarSep} />
            <span className={styles.pillar}>
              <span className={styles.pillarDot} /> Scale
            </span>
          </motion.div>

          {/* Actions — primary CTA is magnetic */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary">
                Get a quote
                <ArrowUpRight size={14} />
              </Link>
            </MagneticButton>
            <Link href="/services" className="btn btn-ghost">
              <Calendar size={13} />
              Book a discovery call
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span>Scroll</span>
        <span className={styles.scrollCueLine} />
      </motion.div>
    </section>
  );
}
