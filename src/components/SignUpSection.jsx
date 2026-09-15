import React from 'react';
import styles from './SignUpSection.module.css';

export default function SignUpSection() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p>Join Stitch Studio to get started.</p>
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <input type="text" placeholder="Full Name" required className={styles.input} />
          <input type="email" placeholder="Email Address" required className={styles.input} />
          <input type="password" placeholder="Password" required className={styles.input} />
          <button type="submit" className={styles.button}>Get Started</button>
        </form>
      </div>
    </section>
  );
}