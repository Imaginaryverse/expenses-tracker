import { useEffect, RefObject } from 'react';

export const useKeyDown = (
  ref: RefObject<HTMLElement>,
  keyDownHandler: (event: KeyboardEvent) => void
) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!!ref?.current && ref.current.contains(event?.target as Node)) {
        keyDownHandler(event);
      }
      return;
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [ref, keyDownHandler]);
};
