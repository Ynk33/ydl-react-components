import styles from "./Carousel.module.scss";

export enum Direction {
  Left = "left",
  Right = "right",
}

type CarouselArrowProps = {
  onClick: () => void;
  direction: Direction;
};

export default function CarouselArrow(props: CarouselArrowProps) {
  return (
    <div
      className={`${styles.carouselArrow} ${styles[props.direction]}`}
      onClick={props.onClick}
    />
  );
}
