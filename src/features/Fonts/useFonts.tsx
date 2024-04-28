import { useContext } from "react";
import FontsContext from "./FontsContext/FontsContext";

/**
 * Custom hook to use the shared fonts.
 */
const useFonts = () => {
  return useContext(FontsContext);
};

export default useFonts;
