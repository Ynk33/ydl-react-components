"use client";

import styles from "./AlertProvider.module.scss";

import { ReactNode, useCallback, useEffect, useState } from "react";
import AlertPositions from "../AlertPositions";
import AlertVariants from "../AlertVariants";
import AlertContext from "../AlertContext/AlertContext";
import AlertOptions from "../AlertOptions";
import AlertWrapper from "../AlertWrapper/AlertWrapper";
import AlertComponent, {
  AlertComponentProps,
} from "../AlertComponent/AlertComponent";

/**
 * Properties of the AlertProvider.
 */
interface AlertProviderProps {
  /**
   * The rest of the application.
   */
  children: ReactNode;
  /**
   * Where the alert should be displayed in the window?
   */
  position: AlertPositions;
  /**
   * How long the Alert should stay up?
   */
  timeout?: number;
}

/**
 * Entry point of the Alert system. This is the component you should put at the root of your application.
 */
export default function AlertProvider({
  children,
  position = AlertPositions.TOP_RIGHT,
  timeout = 5000,
}: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Array<AlertComponentProps>>([]);

  /**
   * Remove an Alert.
   */
  const remove = useCallback((id: string) => {
    setAlerts((currentAlerts) => {
      const alert = currentAlerts.find((a) => a.id === id);
      if (alert === undefined) return currentAlerts;

      const lengthBeforeRemove = currentAlerts.length;
      const filteredAlerts = currentAlerts.filter((a) => a.id !== id);

      if (lengthBeforeRemove > filteredAlerts.length && alert.options.onClose) {
        alert.options.onClose();
      }

      return filteredAlerts;
    });
  }, []);

  /**
   * Remove all the Alerts.
   */
  const removeAll = useCallback(() => {
    alertContext.alerts.forEach(alert => remove(alert.id));
  }, [remove]);

  /**
   * Show a new Alert.
   */
  const show = useCallback(
    (message = "", options = {}) => {
      const id = Math.random().toString(36).substring(2, 9);

      const alertOptions: AlertOptions = {
        position,
        timeout,
        onOpen: () => {},
        onClose: () => {},
        ...options,
      };

      const alert: AlertComponentProps = {
        id,
        message,
        options: alertOptions,
        close: () => remove(alert.id),
      };

      setAlerts((state) => state.concat(alert));
      if (alert.options.onOpen) alert.options.onOpen();

      return alert;
    },
    [position, remove, timeout]
  );

  /**
   * Show a new Info Alert.
   */
  const info = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariants.INFO;
      return show(message, options);
    },
    [show]
  );

  /**
   * Show a new Success Alert.
   */
  const success = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariants.SUCCESS;
      return show(message, options);
    },
    [show]
  );

  /**
   * Show a new Warning Alert.
   */
  const warning = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariants.WARNING;
      return show(message, options);
    },
    [show]
  );

  /**
   * Show a new Danger Alert.
   */
  const danger = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariants.DANGER;
      return show(message, options);
    },
    [show]
  );

  /**
   * The final parameters for the Alex system Context.
   */
  const alertContext = {
    alerts,
    show,
    remove,
    removeAll,
    info,
    success,
    warning,
    danger,
  };

  /**
   * Sort the Alerts by positions, for rendering
   */
  const alertsByPositions = alerts.reduce(
    (result: { [key: string]: AlertComponentProps[] }, alert) => {
      const key: string = alert.options.position ?? "";
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(alert);
      return result;
    },
    {}
  );

  return (
    <AlertContext.Provider value={alertContext}>
      {children}
      <div className={styles.alertProvider}>
        {Object.values(AlertPositions).map((position) => {
          return (
            <AlertWrapper key={position} position={position}>
              {alertsByPositions[position]
                ? alertsByPositions[position].map((alert) => {
                    return <AlertComponent key={alert.id} {...alert} />;
                  })
                : null}
            </AlertWrapper>
          );
        })}
      </div>
    </AlertContext.Provider>
  );
}
