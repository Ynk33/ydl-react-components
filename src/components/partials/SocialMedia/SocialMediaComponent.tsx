import styles from "@/partials/SocialMedia/SocialMediaComponent.module.scss";

import { SocialMedia } from "@/lib/index";
import { InstagramButton } from "@/partials/SocialMedia/buttons";

export default function SocialMediaComponent({
  socialMedia,
  size = 32,
  filled = false,
  invert = false,
}: {
  socialMedia: SocialMedia;
  size?: number;
  filled?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={styles.socialMedia} style={{height: size}}>
      {socialMedia.instagram && (
        <InstagramButton link={socialMedia.instagram} size={size} filled={filled} invert={invert} />
      )}
    </div>
  )
}
