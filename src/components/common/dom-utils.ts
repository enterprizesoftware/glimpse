import { isAssigned, isNil } from '@/components/common/lang';
import { Position } from '@/components/common/types';

export function loadSelector(selector: string): Element | null {
  const elem = document.querySelector(selector);
  if (isNil(elem)) console.warn(`Selector not found: ${selector}`);
  return elem;
}

export function getViewportPosition(event: MouseEvent): Position {
    if (isAssigned(event.pageX) || isAssigned(event.pageY))
      return [event.pageX, event.pageY];
    else if (isAssigned(event.clientX) || isAssigned(event.clientY))
      return [event.clientX, event.clientY];

    console.warn('Unable to get position from event');
    return [0, 0];
}

export function withinElement(element: Element, target: EventTarget) {
  return element === target || element.contains(<Element>target);
}

export function outsideElement(element: Element, target: EventTarget) {
  return !withinElement(element, target);
}
