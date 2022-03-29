import React from "react";
import styles from "./container.module.scss";

export function Container({ topSlot, leftSlot, rightSlot }) {
  return (
    <div className={styles.root}>
      <div className={styles.topSlot}>{topSlot}</div>
      <div className={styles.flexWrapper}>
        <div className={styles.leftSlot}>{leftSlot}</div>
        <div className={styles.rightSlot}>{rightSlot}</div>
      </div>
    </div>
  );
}
