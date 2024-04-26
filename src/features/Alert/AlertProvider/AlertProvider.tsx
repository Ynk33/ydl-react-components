import styles from "./AlertProvider.module.scss";

import { ReactNode, useCallback, useEffect, useState } from "react";
import AlertPositions from "../AlertPositions";
import AlertVariants from "../AlertVariants";
import AlertContext from "../AlertContext";
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
   * What variant should the Alert component use?
   */
  variant?: AlertVariants;
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
  variant = AlertVariants.INFO,
  timeout = 5000,
}: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Array<AlertComponentProps>>([]);

  const timersId: Array<NodeJS.Timeout> = [];

  /**
   * Remove an Alert.
   */
  const remove = useCallback((alert: AlertComponentProps) => {
    setAlerts((currentAlerts) => {
      const lengthBeforeRemove = currentAlerts.length;
      const filteredAlerts = currentAlerts.filter((a) => a.id !== alert.id);

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
    alertContext.alerts.forEach(remove);
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
        variant,
        onOpen: () => {},
        onClose: () => {},
        ...options,
      };

      const alert: AlertComponentProps = {
        id,
        message,
        options: alertOptions,
        close: () => remove(alert)
      };

      if (alert.options.timeout) {
        const timerId = setTimeout(() => {
          remove(alert);

          timersId.splice(timersId.indexOf(timerId), 1);
        }, alert.options.timeout);

        timersId.push(timerId);
      }

      setAlerts((state) => state.concat(alert));
      if (alert.options.onOpen) alert.options.onOpen();

      return alert;
    },
    [position, remove, timeout, variant]
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
   * Hook to take care of disposing of the Alert once their timeout is reached.
   */
  useEffect(() => {
    const timersIdRef = timersId;

    return () => {
      timersIdRef.forEach(clearTimeout);
    };
  }, []);

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
