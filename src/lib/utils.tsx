/**
 * Return the scroll properties of the given element.
 * @param element The element to get the scroll from.
 * @returns {Array<number>} The scroll data of the element.
 */
export function getScroll(element: Window | HTMLElement): number[] {
  const elementAsWindow = element as Window;
  const elementAsHTMLElement = element as HTMLElement;

  if (elementAsWindow.scrollX !== undefined) {
    return [elementAsWindow.scrollX, elementAsWindow.scrollY];
  } else if (elementAsHTMLElement.scrollLeft !== undefined) {
    return [elementAsHTMLElement.scrollLeft, elementAsHTMLElement.scrollTop];
  } else {
    console.error(
      "The element is neither of type Window or HTMLElement",
      element
    );
    return [0, 0];
  }
}

// 
/**
 * Generate an unique ID.
 * @returns {string} A unique ID.
 */
export function getUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
