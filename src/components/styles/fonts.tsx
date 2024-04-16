import {
  Caveat as PrimaryFont,
  Didact_Gothic as SecondaryFont,
} from "next/font/google";

export const primaryFont = PrimaryFont({
  weight: "400",
  subsets: ["latin"]
});

export const secondaryFont = SecondaryFont({
  weight: "400",
  subsets: ["latin"],
});
