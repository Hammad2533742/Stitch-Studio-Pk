import React from 'react';
import styles from './OperationsVideo.module.css';

export default function OperationsVideo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Our Operations</h2>
      <p className={styles.subheading}>Experience our end-to-end craft and production pipeline in real time.</p>
      
      <div className={styles.videoWrapper}>
        <video controls poster="/assets/video-thumbnail.jpg" className={styles.videoPlayer}>
          <source src="/assets/operations.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}