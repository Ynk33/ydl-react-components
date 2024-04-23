import { Picture } from "../../../lib";
import styles from "./Background.module.scss";

import Image from "next/image";

export default function Background({ picture }: { picture: Picture }) {
  return (
    <Image
      src={picture.full_image_url}
      alt="background"
      height={picture.media_details.height}
      width={picture.media_details.width}
      className={styles.background}
    />
  );
}
