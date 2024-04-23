import styles from "./Background.module.scss";

import Image from "next/image";

export default function Background({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="background"
      sizes="100vw"
      className={styles.background}
    />
  );
}
