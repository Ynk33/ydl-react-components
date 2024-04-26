import { useContext } from 'react';
import AlertContext from "../../components/partials/Alert/AlertContext";

const useAlert = () => {
  const alertContext = useContext(AlertContext);
  return alertContext;
}

export default useAlert;