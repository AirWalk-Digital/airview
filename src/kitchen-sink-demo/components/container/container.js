import React from "react";
import styles from "./container.module.scss";

export function Container({ leftSlot, rightSlot }) {
  return (
    <div className={styles.root}>
      <div className={styles.leftSlot}>{leftSlot}</div>
      <div className={styles.rightSlot}>{rightSlot}</div>
    </div>
  );
}
