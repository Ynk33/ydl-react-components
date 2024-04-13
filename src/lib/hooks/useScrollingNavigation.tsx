import useWindowDimensions from "./useWindowDimensions";
import { getScroll } from "../utils";
import { useEffect, useState } from "react";

/**
 * Directions used in useScrollingNavigation.
 */
export enum Direction {
  x,
  y,
}

/**
 * Custom hook to implement a scrolling navigation in a HTML element.
 * @param getScrollContainer Function to retrieve the scroll container.
 * @param elementsIds List of IDs to retrieve the elements to navigate between.
 * @param activeElementId The currently active element.
 * @param direction Navigation direction.
 * @param margin Margin to apply when scrolling to the active element.
 * @returns The currently active element.
 */
export default function useScrollingNavigation(
  getScrollContainer: () => HTMLElement | Window | null,
  elementsIds: string[],
  activeElementId: string = "",
  direction: Direction = Direction.y,
  margin: number = 0
): string {
  // State storing the active element, i.e. the element currently scrolled on
  const [activeElement, setActiveElement] = useState(activeElementId);
  // State storing the element to scroll to
  const [targetElement, setTargetElement] = useState(activeElementId);

  // Window's dimensions, it is useful for determining which element is currently scrolled on
  const windowDimensions = useWindowDimensions();

  // Update targetElement with the activeElementId given as a property
  useEffect(() => {
    setTargetElement(activeElementId);
  }, [activeElementId]);

  // Scroll whenever targetElement changes
  useEffect(() => {
    // Scroll to the target element
    const scroll = () => {
      if (targetElement === "") return;
      
      const container = getScrollContainer();
      const element = document.getElementById(targetElement);

      if (container && element) {
        let [scrollToX, scrollToY] = getScroll(container);
        scrollToX += element.getBoundingClientRect().left - margin;
        scrollToY += element.getBoundingClientRect().top - margin;

        container.scrollTo({
          left: direction === Direction.x ? scrollToX : 0,
          top: direction === Direction.y ? scrollToY : 0,
          behavior: "smooth",
        });
      }
    };

    scroll();
  }, [targetElement, getScrollContainer, direction, margin]);

  // Listen to the "scroll" event of the container to update the activeElement
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) {
      return;
    }

    // Check the current scroll to determine which element is currently scrolled on (the activeElement)
    const determineActiveElement = () => {
      elementsIds.forEach((elementId) => {
        const section = document.getElementById(elementId);
        if (section) {
          const rect = section.getBoundingClientRect();
  
          if (direction === Direction.x) {
            if (
              rect.left <= windowDimensions.width * 0.1 &&
              rect.right >= windowDimensions.width * 0.9
            ) {
              setActiveElement(elementId);
            }
          } else {
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveElement(elementId);
            }
          }
        }
      });
    };

    container.addEventListener("scroll", determineActiveElement);
    return () => {
      container.removeEventListener("scroll", determineActiveElement);
    };
  });

  return activeElement;
}
