import Link from 'next/link';
import { Linkedin, Twitter, Github, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { type Service } from '@/lib/services';
import styles from './Footer.module.css';

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="lgF" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#ff4258" />
          <stop offset="1" stopColor="#b8101f" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
        fill="none"
        stroke="url(#lgF)"
        strokeWidth="1.5"
      />
      <path
        d="M11 12 L21 12 M11 16 L17 16 M11 20 L21 20"
        stroke="url(#lgF)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="22" cy="16" r="1.5" fill="#ff4258" />
    </svg>
  );
}

export default function Footer({ services }: { services: Service[] }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow} />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>
                <LogoMark />
              </span>
              <span>
                {siteConfig.shortName}
                <span className={styles.logoDot}>.</span>
              </span>
            </Link>
            <p className={styles.brandDesc}>{siteConfig.description}</p>
            <div className={styles.socials}>
              <a href={siteConfig.social.linkedin} className={styles.socialBtn} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} />
              </a>
              <a href={siteConfig.social.twitter} className={styles.socialBtn} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={14} />
              </a>
              <a href={siteConfig.social.github} className={styles.socialBtn} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github size={14} />
              </a>
              <a href={siteConfig.social.instagram} className={styles.socialBtn} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          <div>
            <div className={styles.colTitle}>Services</div>
            <ul className={styles.colList}>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={styles.colLink}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Company</div>
            <ul className={styles.colList}>
              <li><Link href="/about" className={styles.colLink}>About</Link></li>
              <li><Link href="/portfolio" className={styles.colLink}>Portfolio</Link></li>
              <li><Link href="/services" className={styles.colLink}>All Services</Link></li>
              <li><Link href="/contact" className={styles.colLink}>Contact</Link></li>
              <li><Link href="/contact" className={styles.colLink}>Careers</Link></li>
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Get in touch</div>
            <ul className={styles.colList}>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className={`${styles.colLink} ${styles.contactItem}`}>
                  <Mail size={14} />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className={`${styles.colLink} ${styles.contactItem}`}>
                  <Phone size={14} />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              {siteConfig.offices.map((office) => (
                <li key={office.city} className={styles.contactItem}>
                  <MapPin size={14} />
                  <span>
                    <span style={{ marginRight: '0.4rem' }}>{office.flag}</span>
                    {office.city}, {office.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className={styles.wordmark}>
          CODENEXSIS
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>Privacy</Link>
            <Link href="/terms" className={styles.bottomLink}>Terms</Link>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{siteConfig.contact.hours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
