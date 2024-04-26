import styles from "./Alert.module.scss";

import AlertAnchor from "./AlertAnchor";
import AlertVariant from "./AlertVariant";
import { FontProvider } from "../../../lib";
import { useEffect, useState } from "react";

export interface AlertProps {
  /**
   * Where the alert should be displayed in the window?
   */
  anchor: AlertAnchor;
  /**
   * What variant should the Alert component use?
   */
  variant: AlertVariant;
  /**
   * What the Alert component should content?
   */
  content: string;
  /**
   * How long the Alert should stay up?
   */
  timeout?: number;
  /**
   * Should the Alert be displayed?
   */
  show?: boolean;
  /**
   * What happens when the Alert hides?
   */
  onHide: () => void;
}

/**
 * A stylized div on the top of everything to display some info to the user.
 */
export default function Alert({ anchor, variant, content, timeout = 5000, show = false, onHide }: AlertProps) {
  const [status, setStatus] = useState("hide");

  useEffect(() => {
    if (show) {
      setStatus("show");

      const hideAlert = () => {
        onHide();
        setStatus("hide");
      }

      const displayInterval = setInterval(hideAlert, timeout);

      return () => clearInterval(displayInterval);
    }
  }, [show]);


  const font = FontProvider.SecondaryFont;

  return (
    <div className={styles.alertContainer}>
      <div
        className={`${font.className} ${styles.alert} ${styles[anchor]} ${styles[variant]} ${styles[status]}`}
      >
        {content}
      </div>
    </div>
  );
}
