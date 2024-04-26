import styles from "./AlertWrapper.module.scss";

import { ReactNode } from "react";
import AlertPositions from "../AlertPositions";

/**
 * Properties of the AlertWrapper.
 */
interface AlertWrapperProps {
  children: ReactNode;
  position: AlertPositions;
  offset: string;
}

/**
 * A container to display a list of Alert in a specific position of the screen.
 */
export default function AlertWrapper({
  children,
  position,
  offset,
}: AlertWrapperProps) {
  return (
    children && (
      <div className={`${styles.wrapper} ${styles[`${position}`]}`} style={{margin: offset}}>
        {children}
      </div>
    )
  );
}
