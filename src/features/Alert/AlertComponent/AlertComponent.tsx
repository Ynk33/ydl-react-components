import styles from "./AlertComponent.module.scss";

import AlertOptions from "../AlertOptions";
import { useState } from "react";
import AlertVariants from "../AlertVariants";
import { FontProvider } from "../../../lib";

/**
 * Properties of the AlertComponent.
 */
export interface AlertComponentProps {
  id: string;
  message: string;
  options: AlertOptions;
  close: (alert: AlertComponentProps) => void;
}

/**
 * The actual Alert displayed to the user.
 */
export default function AlertComponent({
  id,
  message,
  options,
  close,
}: AlertComponentProps) {
  const [hide, setHide] = useState(false);

  const font = FontProvider.SecondaryFont;

  /**
   * Fade the Alert out before disposing of it.
   */
  const closeAlert = () => {
    setHide(true);
    setInterval(() => {
      close({ id, message, options, close });
    }, 250);
  };

  // TODO: Enhances Alert style

  return (
    <div
      className={`${styles.alert} ${styles[options?.variant ?? AlertVariants.INFO]} ${hide ? styles.hide : ""} ${font.className}`}
      onClick={closeAlert}
    >
      {message}
    </div>
  );
}
