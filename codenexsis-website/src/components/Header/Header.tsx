'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  Menu, X, ChevronDown, ArrowUpRight,
  MapPin, Clock, Phone, Mail,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { type Service } from '@/lib/services';
import MegaMenu from './MegaMenu';
import MarketingMegaMenu from './MarketingMegaMenu';
import styles from './Header.module.css';

const navItems: {
  label: string;
  href: string;
  hasMega?: boolean;
  hasMarketingMega?: boolean;
}[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'SEO & Marketing', href: '/digital-marketing', hasMarketingMega: true },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

type ContactInfo = { email: string; phone: string; address: string; hours: string };

export default function Header({
  services,
  contact,
}: {
  services: Service[];
  contact: ContactInfo;
}) {
  const coreServices = services.filter((s) => s.category !== 'market');
  const marketing = services.filter((s) => s.category === 'market');

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [marketingOpen, setMarketingOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeMktTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const openMarketing = () => {
    if (closeMktTimer.current) clearTimeout(closeMktTimer.current);
    setMarketingOpen(true);
  };

  const scheduleCloseMarketing = () => {
    if (closeMktTimer.current) clearTimeout(closeMktTimer.current);
    closeMktTimer.current = setTimeout(() => setMarketingOpen(false), 150);
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
                <span>{contact.address}</span>
              </span>
              <span className={styles.topDivider} />
              <span className={styles.topItem}>
                <Clock size={11} strokeWidth={2} />
                <span>{contact.hours}</span>
              </span>
            </div>
            <div className={styles.topRight}>
              <a href={`mailto:${contact.email}`} className={styles.topItem}>
                <Mail size={11} strokeWidth={2} />
                <span>{contact.email}</span>
              </a>
              <span className={styles.topDivider} />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={styles.topItem}>
                <Phone size={11} strokeWidth={2} />
                <span>{contact.phone}</span>
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
                    key={item.label}
                    className={`${styles.navItem} ${megaOpen ? styles.navItemOpen : ''}`}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                      <ChevronDown className={styles.navCaret} />
                    </Link>
                    <MegaMenu open={megaOpen} services={services} />
                  </div>
                ) : item.hasMarketingMega ? (
                  <div
                    key={item.label}
                    className={`${styles.navItem} ${marketingOpen ? styles.navItemOpen : ''}`}
                    onMouseEnter={openMarketing}
                    onMouseLeave={scheduleCloseMarketing}
                  >
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                      <ChevronDown className={styles.navCaret} />
                    </Link>
                    <MarketingMegaMenu open={marketingOpen} services={services} />
                  </div>
                ) : (
                  <Link key={item.label} href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className={styles.right}>
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
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
                key={item.label}
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
            <div className={styles.mobileSectionLabel}>
              Core Services ({coreServices.length})
            </div>
            {coreServices.map((s) => (
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
            <div className={styles.mobileSectionLabel}>
              SEO &amp; Digital Marketing ({marketing.length})
            </div>
            {marketing.map((s) => (
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
            <a href={`mailto:${contact.email}`} className={styles.mobileLink}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} /> {contact.email}
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={styles.mobileLink}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} /> {contact.phone}
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
