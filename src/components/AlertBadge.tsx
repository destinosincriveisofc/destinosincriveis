import React from 'react';
import styles from './AlertBadge.module.css';

interface AlertBadgeProps {
  text: string;
}

export default function AlertBadge({ text }: AlertBadgeProps) {
  return (
    <span className={styles.badge}>
      <span className={styles.dot} />
      {text}
    </span>
  );
}
