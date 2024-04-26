import styles from "./AlertWrapper.module.scss";

import { ReactNode } from "react";
import AlertAnchor from "../AlertAnchor";

interface AlertWrapperProps {
  children: ReactNode;
  position: AlertAnchor;
}

export default function AlertWrapper({
  children,
  position,
}: AlertWrapperProps) {
  return children && (
    <div className={`${styles.wrapper} ${styles[`${position}`]}`}>
      {children}
    </div>
  );
}
