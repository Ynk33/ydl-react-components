import styles from "@/partials/social-media/buttons/_SocialButton.module.scss";

import { SocialButtonProps } from "@/partials/SocialMedia/buttons/_SocialButtonProps";

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
