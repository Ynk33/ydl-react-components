import styles from "./SocialMediaComponent.module.scss";

import { SocialMedia } from "../../../lib";
import { InstagramButton } from "./buttons";

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
