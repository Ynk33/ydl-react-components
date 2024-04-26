import { createContext } from 'react';
import AlertOptions from './AlertOptions';
import AlertAnchor from './AlertAnchor';
import AlertVariant from './AlertVariant';
import { AlertComponentProps } from './AlertComponent/AlertComponent';

type AlertFunctionSignature = (message?: string, options?: AlertOptions) => AlertComponentProps;

export interface AlertContext {
  alerts: Array<AlertComponentProps>;
  show: () => void;
  remove: (alert: AlertComponentProps) => void;
  removeAll: () => void;
  success: AlertFunctionSignature;
  warning: AlertFunctionSignature;
  danger: AlertFunctionSignature;
  info: AlertFunctionSignature;
}

const emptyAlert: AlertComponentProps = {
  id: "0",
  message: "This is an alert",
  options: {
    position: AlertAnchor.TOP_RIGHT,
    timeout: 5000,
    variant: AlertVariant.INFO
  },
  close: (alert: AlertComponentProps) => {}
}

const emptyContext: AlertContext = {
  alerts: [],
  show: () => {},
  remove: (_alert: AlertComponentProps) => {},
  removeAll: () => {},
  success: (_message?: string, _options?: AlertOptions) => emptyAlert,
  warning: (_message?: string, _options?: AlertOptions) => emptyAlert,
  danger: (_message?: string, _options?: AlertOptions) => emptyAlert,
  info: (_message?: string, _options?: AlertOptions) => emptyAlert,
}

const AlertContext = createContext<AlertContext>(emptyContext);

export default AlertContext;