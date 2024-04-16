"use client";

import styles from "./Carousel.module.scss";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Picture, useScrollingNavigation, useRepeatingCallback, Direction } from "../../../lib";
import CarouselNav from "./CarouselNav";
import CarouselArrow, {
  Direction as ArrowDirection,
} from "./CarouselArrow";
import CarouselItem from "./CarouselItem";

export enum Fill {
  Cover = "cover",
  Contain = "contain",
}

type CarouselProps = {
  pictures: Picture[];
  activeIndex: number;
  fill?: Fill;
  autoPlay?: boolean;
  showArrows?: boolean;
  showCaption?: boolean;
  onSelect: (selectedIndex: number) => void;
};

export default function Carousel(props: CarouselProps) {
  // Store the index of the current displayed picture
  const [activePictureIndex, setActivePictureIndex] = useState(
    props.activeIndex
  );

  // Reference to the InnerCarousel div
  const innerCarouselRef = useRef(null);

  const uniqueId = useId();

  // List the pictures' IDs
  const picturesIds = props.pictures.map((picture) => {
    return uniqueId + picture.id.toString();
  });

  // Scroll to next picture
  const next = () => {
    props.onSelect(
      activePictureIndex === props.pictures.length - 1
        ? 0
        : activePictureIndex + 1
    );
  };

  // Scroll to previous picture
  const prev = () => {
    props.onSelect(
      activePictureIndex === 0
        ? props.pictures.length - 1
        : activePictureIndex - 1
    );
  };

  // Wrap the inner carousel getter into a useCallback to prevent extra re-rendering
  const getInnerCarouselRef = useCallback(() => {
    return innerCarouselRef.current;
  }, [innerCarouselRef]);

  // Scrolling behaviour
  useScrollingNavigation(
    getInnerCarouselRef,
    picturesIds,
    uniqueId + props.pictures[props.activeIndex].id.toString(),
    Direction.x
  );

  // Autoplay behaviour
  useRepeatingCallback(
    5000,
    props.autoPlay
      ? () => {
          if (activePictureIndex + 1 >= props.pictures.length) {
            props.onSelect(0);
          } else {
            props.onSelect(activePictureIndex + 1);
          }
        }
      : () => {}
  );

  // Update the activePictureIndex whenever the activeIndex props changes
  // This happens when the user opens the carousel from the gallery by clicking on a specific picture
  useEffect(() => {
    setActivePictureIndex(props.activeIndex);
  }, [props.activeIndex]);

  return (
    <div className={styles.carousel}>
      <div ref={innerCarouselRef} className={styles.carouselInner}>
        {props.pictures.map((picture: Picture) => {
          return (
            <CarouselItem
              id={uniqueId + picture.id}
              key={picture.id}
              picture={picture}
              fill={props.fill ?? Fill.Cover}
              showCaption={props.showCaption}
            />
          );
        })}
      </div>

      {props.showCaption && (
        <div className={styles.textOverlay} />
      )}

      {props.showArrows && (
        <>
          <CarouselArrow direction={ArrowDirection.Left} onClick={prev} />
          <CarouselArrow direction={ArrowDirection.Right} onClick={next} />
        </>
      )}

      <CarouselNav itemCount={props.pictures.length} {...props} />
    </div>
  );
}
