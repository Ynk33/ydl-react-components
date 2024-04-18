"use client";

import { MouseEvent, ReactNode, useEffect } from "react";

import styles from "./Modal.module.scss";

export default function Modal({
  show,
  onHide,
  children,
}: {
  show: boolean;
  onHide: () => void;
  children: ReactNode;
}) {

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onHide();
  }

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflowY = show
      ? "hidden"
      : "auto";
  });

  return (
    <div className={`${styles.modal} ${show ? styles.open : ""}`}>
      <a href="/" className={styles.close} onClick={handleClose} />
      {children}
    </div>
  );
}
