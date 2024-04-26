import { useContext } from 'react';
import AlertContext from './AlertContext/AlertContext';

/**
 * Custom hook to use Alerts in the application.
 */
const useAlert = () => {
  const alertContext = useContext(AlertContext);
  return alertContext;
}

export default useAlert;