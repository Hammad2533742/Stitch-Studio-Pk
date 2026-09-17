import React, { useState } from 'react';
import styles from './FaqAccordion.module.css';

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    { q: "What services does Stitch Studio offer?", a: "We provide bespoke garment manufacturing, automated production workflows, and full-stack digital solutions." },
    { q: "How do I access the operations workspace?", a: "Create an account via our Sign Up section to gain instant access to real-time production insights." },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <div className={styles.accordion}>
        {faqs.map((faq, idx) => (
          <div key={idx} className={`${styles.item} ${openIdx === idx ? styles.active : ''}`}>
            <button className={styles.question} onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
              <span>{faq.q}</span>
              <span>{openIdx === idx ? '−' : '+'}</span>
            </button>
            <div className={styles.answer}>
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}