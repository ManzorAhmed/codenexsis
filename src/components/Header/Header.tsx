'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  Menu, X, ChevronDown, ArrowUpRight,
  MapPin, Clock, Phone, Mail,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { services } from '@/lib/services';
import MegaMenu from './MegaMenu';
import styles from './Header.module.css';

const navItems: { label: string; href: string; hasMega?: boolean }[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
      <div className={styles.headerWrap}>
        {/* Top info bar */}
        <div className={`${styles.topBar} ${scrolled ? styles.topBarHidden : ''}`}>
          <div className={`container ${styles.topBarInner}`}>
            <div className={styles.topLeft}>
              <span className={styles.topItem}>
                <MapPin size={11} strokeWidth={2} />
                <span>{siteConfig.contact.address}</span>
              </span>
              <span className={styles.topDivider} />
              <span className={styles.topItem}>
                <Clock size={11} strokeWidth={2} />
                <span>{siteConfig.contact.hours}</span>
              </span>
            </div>
            <div className={styles.topRight}>
              <a href={`mailto:${siteConfig.contact.email}`} className={styles.topItem}>
                <Mail size={11} strokeWidth={2} />
                <span>{siteConfig.contact.email}</span>
              </a>
              <span className={styles.topDivider} />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className={styles.topItem}>
                <Phone size={11} strokeWidth={2} />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <span className={styles.topDivider} />
              <span className={styles.topAvail}>
                <span className={styles.topAvailDot} />
                <span>Booking Q3 engagements</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
          <div className={`container ${styles.inner}`}>
            <Link href="/" className={styles.logo} aria-label={siteConfig.name}>
              <span className={styles.logoMark}>
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  width={250}
                  height={112}
                  priority
                />
              </span>
            </Link>

            <nav className={styles.nav}>
              {navItems.map((item) =>
                item.hasMega ? (
                  <div
                    key={item.href}
                    className={`${styles.navItem} ${megaOpen ? styles.navItemOpen : ''}`}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                      <ChevronDown className={styles.navCaret} />
                    </Link>
                    <MegaMenu open={megaOpen} />
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className={styles.right}>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className={styles.callBtn}
                aria-label="Call us"
              >
                <Phone size={13} strokeWidth={2} />
                <span>Call</span>
              </a>
              <Link href="/contact" className={`btn btn-primary ${styles.headerCTA}`}>
                Get a quote
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen((s) => !s)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="container">
          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionLabel}>Navigate</div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>

          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionLabel}>All Services (10)</div>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {s.shortTitle}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>

          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionLabel}>Contact</div>
            <a href={`mailto:${siteConfig.contact.email}`} className={styles.mobileLink}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} /> {siteConfig.contact.email}
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className={styles.mobileLink}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} /> {siteConfig.contact.phone}
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <Link
            href="/contact"
            className={`btn btn-primary ${styles.mobileCTA}`}
            onClick={() => setMobileOpen(false)}
          >
            Get a quote
          </Link>
        </div>
      </div>
    </>
  );
}
