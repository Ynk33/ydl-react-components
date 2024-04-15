/**
 * Directions used in useScrollingNavigation.
 */
export declare enum Direction {
    x = 0,
    y = 1
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
export default function useScrollingNavigation(getScrollContainer: () => HTMLElement | Window | null, elementsIds: string[], activeElementId?: string, direction?: Direction, margin?: number): string;
//# sourceMappingURL=useScrollingNavigation.d.ts.map