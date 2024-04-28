"use client";

import { createContext } from "react";
import AlertOptions from "../AlertOptions";
import AlertPositions from "../AlertPositions";
import AlertVariants from "../AlertVariants";
import { AlertComponentProps } from "../AlertComponent/AlertComponent";

/**
 * Signature of the Alert functions used to display it.
 */
type AlertFunctionSignature = (
  message?: string,
  options?: AlertOptions
) => AlertComponentProps;

/**
 * Define the Context of the Alert system.
 */
export interface AlertContext {
  alerts: Array<AlertComponentProps>;
  show: () => void;
  remove: (alertId: string) => void;
  removeAll: () => void;
  info: AlertFunctionSignature;
  success: AlertFunctionSignature;
  warning: AlertFunctionSignature;
  danger: AlertFunctionSignature;
}

/**
 * A default Alert.
 */
const defaultAlert: AlertComponentProps = {
  id: "0",
  message: "This is an alert",
  options: {
    position: AlertPositions.TOP_RIGHT,
    timeout: 5000,
    variant: AlertVariants.INFO,
  },
  close: (_id: string) => {},
};

/**
 * A default Context.
 */
const defaultContext: AlertContext = {
  alerts: [],
  show: () => {},
  remove: (_alertId: string) => {},
  removeAll: () => {},
  info: (_message?: string, _options?: AlertOptions) => defaultAlert,
  success: (_message?: string, _options?: AlertOptions) => defaultAlert,
  warning: (_message?: string, _options?: AlertOptions) => defaultAlert,
  danger: (_message?: string, _options?: AlertOptions) => defaultAlert,
};

/**
 * Create the Alert system Context.
 */
const AlertContext = createContext<AlertContext>(defaultContext);
export default AlertContext;
