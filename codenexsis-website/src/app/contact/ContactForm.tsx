'use client';

import { ArrowUpRight } from 'lucide-react';
import styles from './contact.module.css';

type ServiceOption = { slug: string; title: string };

export default function ContactForm({ services }: { services: ServiceOption[] }) {
  return (
    <form
      className={styles.formGrid}
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thanks — we'll be in touch within 4 business hours.");
      }}
    >
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input id="name" className={styles.input} required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input id="email" type="email" className={styles.input} required />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="company">Company</label>
          <input id="company" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="budget">Budget</label>
          <select id="budget" className={styles.select}>
            <option>Under $50k</option>
            <option>$50k – $150k</option>
            <option>$150k – $400k</option>
            <option>$400k+</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="service">Service</label>
        <select id="service" className={styles.select}>
          <option>Choose a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
          <option>Multiple / not sure</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="msg">Project brief</label>
        <textarea
          id="msg"
          className={styles.textarea}
          rows={5}
          placeholder="Goals, timeline, constraints, what success looks like…"
        />
      </div>

      <button type="submit" className={`btn btn-primary ${styles.submit}`}>
        Send brief <ArrowUpRight size={16} />
      </button>
      <p className={styles.formNote}>
        NDA available on request • Avg response &lt; 4 hours
      </p>
    </form>
  );
}
