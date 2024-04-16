import { ReactNode } from "react";

export interface SocialButtonProps {
  link: string;
  size?: number;
  invert?: boolean;
  filled?: boolean;
  children?: ReactNode;
}