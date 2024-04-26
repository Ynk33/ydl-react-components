import styles from "./AlertProvider.module.scss";

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import AlertAnchor from "./AlertAnchor";
import AlertVariant from "./AlertVariant";
import AlertContext from "./AlertContext";
import AlertOptions from "./AlertOptions";
import AlertWrapper from "./AlertWrapper/AlertWrapper";
import AlertComponent, { AlertComponentProps } from "./AlertComponent/AlertComponent";

interface AlertProviderProps {
  children: ReactNode;
  /**
   * Where the alert should be displayed in the window?
   */
  position: AlertAnchor;
  /**
   * What variant should the Alert component use?
   */
  variant: AlertVariant;
  /**
   * How long the Alert should stay up?
   */
  timeout?: number;
}

export default function AlertProvider({
  children,
  position = AlertAnchor.TOP_RIGHT,
  variant = AlertVariant.INFO,
  timeout = 5000,
}: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Array<AlertComponentProps>>([]);
  
  const timersId: Array<NodeJS.Timeout> = [];

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

  const removeAll = useCallback(() => {
    alertContext.alerts.forEach(remove);
  }, [remove]);

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
        close: (_alert: AlertComponentProps) => {},
      };

      alert.close = () => remove(alert);

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

  const info = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariant.INFO;
      return show(message, options);
    },
    [show]
  );

  const success = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariant.SUCCESS;
      return show(message, options);
    },
    [show]
  );

  const warning = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariant.WARNING;
      return show(message, options);
    },
    [show]
  );

  const danger = useCallback(
    (message = "", options: AlertOptions = {}) => {
      options.variant = AlertVariant.DANGER;
      return show(message, options);
    },
    [show]
  );

  const alertContext = {
    alerts,
    show,
    remove,
    removeAll,
    success,
    warning,
    danger,
    info,
  };

  const alertsByPositions = alerts.reduce((result: {[key: string]: AlertComponentProps[]}, alert) => {
    const key: string = alert.options.position ?? "";
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(alert);
    return result;
  }, {});

  useEffect(() => {
    const timersIdRef = timersId;

    return () => {
      timersIdRef.forEach(clearTimeout);
    };
  }, []);

  return (
    <AlertContext.Provider value={alertContext}>
      {children}
      <div className={styles.alertProvider}>
        {
          Object.values(AlertAnchor).map(position => {
            return (
              <AlertWrapper key={position} position={position}>
                {alertsByPositions[position]
                  ? alertsByPositions[position].map(alert => {
                    return <AlertComponent key={alert.id} {...alert} />
                  })
                  : null}
              </AlertWrapper>
            );
          })
        }
      </div>
    </AlertContext.Provider>
  )
}