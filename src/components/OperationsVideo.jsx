import React from 'react';
import styles from './OperationsVideo.module.css';

export default function OperationsVideo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Our Operations</h2>
      <p className={styles.subheading}>Experience our end-to-end craft and production pipeline in real time.</p>
      <div className={styles.videoWrapper}>
        <iframe
          src="https://drive.google.com/file/d/1XuRCoU7rmdIUM0oXfsF_wUbXcpqYLqce/preview"
          title="Stitch Studio Operations Video"
          className={styles.iframePlayer}
          allow="autoplay"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}