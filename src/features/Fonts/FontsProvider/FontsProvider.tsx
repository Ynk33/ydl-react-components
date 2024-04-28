import { NextFont } from "next/dist/compiled/@next/font";
import FontsContext from "../FontsContext/FontsContext";
import { ReactNode } from "react";

/**
 * Properties of the FontsProvider.
 */
interface FontsProviderProps {
  /**
   * The rest of the application.
   */
  children: ReactNode;
  /**
   * The primary font.
   */
  primaryFont: NextFont;
  /**
   * The secondary font.
   */
  secondaryFont: NextFont;
}

/**
 * Entry point of the FontsProvider, to share NextFonts accross the entire application.
 */
export default function FontsProvider({
  children,
  primaryFont,
  secondaryFont,
}: FontsProviderProps) {
  const fontsContext = {
    primaryFont: primaryFont,
    secondaryFont: secondaryFont,
  };

  return (
    <FontsContext.Provider value={fontsContext}>
      {children}
    </FontsContext.Provider>
  );
}
