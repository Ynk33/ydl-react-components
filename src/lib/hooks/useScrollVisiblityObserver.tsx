import { useEffect } from "react";

/**
 * Custom hook to add a CSS class to a group of HTML elements depending on their visibility.
 * @param selector CSS selector to get the elements to interact with.
 * @param classToAdd CSS class to add to the currently visible elements.
 * @param options Additional options for the IntersectionObserver.
 * @param debug If true, adds some debug logs.
 */
export default function useScrollVisiblityObserver(
  selector: string,
  classToAdd: string,
  options?: IntersectionObserverInit | undefined,
  debug: boolean = false
) {
  const addObserver = (element: Element, classToAdd: string) => {
    if (!classToAdd) return;
    
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(classToAdd);
        } else {
          entry.target.classList.remove(classToAdd);
        }
      });
    }, options);

    observer.observe(element);
  };

  const observe = (selector: string, classToAdd: string) => {
    let elements = document.querySelectorAll(selector);

    if (debug) {
      console.log(selector, elements);
    }

    elements.forEach((element) => {
      addObserver(element, classToAdd);
    });
  };

  useEffect(() => {
    observe(selector, classToAdd);
  });
}
