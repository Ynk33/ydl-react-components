"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { createContext } from "react";
import { primaryFont, secondaryFont } from "../../../styles/fonts";

/**
 * Define the FontsContext.
 */
export interface FontsContext {
  primaryFont: NextFont;
  secondaryFont: NextFont;
}

/**
 * The default FontsContext.
 */
const defaultFontsContext = {
  primaryFont: primaryFont,
  secondaryFont: secondaryFont,
};

/**
 * Create the FontsContext.
 */
const FontsContext = createContext<FontsContext>(defaultFontsContext);
export default FontsContext;
