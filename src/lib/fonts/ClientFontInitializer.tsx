"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import FontProvider from "./FontProvider";

export default function ClientFontInitializer({
  primaryFont,
  secondaryFont,
}: {
  primaryFont: NextFont;
  secondaryFont: NextFont;
}) {
  // Initialize the FrontProvider to share these fonts across the application.
  FontProvider.initialize(primaryFont, secondaryFont);

  return <></>;
}
