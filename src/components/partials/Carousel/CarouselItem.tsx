import styles from "./Carousel.module.scss";

import { Fill } from "./Carousel";
import Image from "next/image";
import { Picture } from "../../../lib";
import { primaryFont, secondaryFont } from "@/fonts";

export default function CarouselItem({
  id,
  picture,
  fill,
  showCaption = false,
}: {
  id: string;
  picture: Picture;
  fill: Fill;
  showCaption?: boolean
}) {
  return (
    <div className={styles.carouselItem} id={id}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${picture.full_image_url})` }}
      />
      <Image
        className={fill === Fill.Contain ? styles.contain : ""}
        src={picture.full_image_url}
        alt={picture.title}
        width={picture.media_details.width}
        height={picture.media_details.height}
      />

      {showCaption && (
        <div className={styles.description}>
          <h3 className={`${styles.title} ${primaryFont.className}`}>{picture.title}</h3>
          <p className={`${styles.caption} ${secondaryFont.className}`}>{picture.caption}</p>
        </div>
      )}
    </div>
  );
}
