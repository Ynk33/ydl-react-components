import AlertPositions from "./AlertPositions";
import AlertVariants from "./AlertVariants";

/**
 * Expose the options available to customize an Alert.
 */
export default interface AlertOptions {
  position?: AlertPositions;
  timeout?: number;
  variant?: AlertVariants;
  onOpen?: () => void;
  onClose?: () => void;
}
