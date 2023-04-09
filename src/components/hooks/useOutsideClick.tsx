import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  outsideClickHandler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!!ref?.current && !ref.current.contains(event?.target as Node)) {
        outsideClickHandler(event);
      }
      return;
    };

    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);

    return () => {
      document.removeEventListener('mousedown', listener, true);
      document.removeEventListener('touchstart', listener, true);
    };
  }, [ref, outsideClickHandler]);
};
