import AlertAnchor from "./AlertAnchor";
import AlertVariant from "./AlertVariant";

export default interface AlertOptions {
  position?: AlertAnchor;
  timeout?: number;
  variant?: AlertVariant;
  onOpen?: () => void;
  onClose?: () => void;
}