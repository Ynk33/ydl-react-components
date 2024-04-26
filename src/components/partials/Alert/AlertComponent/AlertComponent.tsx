import styles from "./AlertComponent.module.scss";

import AlertOptions from "../AlertOptions";
import { useEffect, useState } from "react";
import { FontProvider } from "../../../../lib";
import AlertVariant from "../AlertVariant";

export interface AlertComponentProps {
  id: string;
  message: string;
  options: AlertOptions;
  close: (alert: AlertComponentProps) => void;
}

export default function AlertComponent({
  id,
  message,
  options,
  close
}: AlertComponentProps) {
  const [hide, setHide] = useState(false);

  const font = FontProvider.SecondaryFont;

  const closeAlert = () => {
    setHide(true);
    console.log('hide');
    setInterval(() => {
      close({id, message, options, close});
    }, 250);
  }

  useEffect(() => {
    const closeTimeout = setInterval(closeAlert, options.timeout);
    return () => clearInterval(closeTimeout);
  });

  return <div className={`${styles.alert} ${styles[options.variant ?? AlertVariant.INFO]} ${hide ? styles.hide : ''} ${font.className}`} onClick={closeAlert}>{message}</div>
}