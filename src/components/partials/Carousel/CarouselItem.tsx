import styles from "./Carousel.module.scss";

import Image from "next/image";
import { Fill } from "./Carousel";
import { Picture } from "../../../lib";
import { Background } from "../Background";
import { useFonts } from "../../../features";

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

  const fonts = useFonts();
  const primaryFont = fonts.primaryFont;
  const secondaryFont = fonts.secondaryFont;

  return (
    <div className={styles.carouselItem} id={id}>
      <Background picture={picture} />
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
