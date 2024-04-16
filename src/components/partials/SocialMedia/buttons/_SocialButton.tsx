import styles from "./_SocialButton.module.scss";

import { SocialButtonProps } from "./_SocialButtonProps";

export default function SocialButton({
  link,
  invert = false,
  filled = false,
  children,
}: SocialButtonProps) {
  return (
    <a
      href={link}
      target="_blank"
      className={`
        ${styles.socialLink}
        ${invert ? styles.invert : ""}
        ${filled ? styles.filled : ""}
      `}
    >
      {children}
    </a>
  );
}
