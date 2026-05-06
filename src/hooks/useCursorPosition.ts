import { useEffect, useRef, useState } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  rawX: number;
  rawY: number;
}

export const useCursorPosition = (): CursorPosition => {
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    rawX: 0,
    rawY: 0,
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const normalizedX = (clientX / window.innerWidth) * 2 - 1; // -1 to 1
        const normalizedY = (clientY / window.innerHeight) * 2 - 1; // -1 to 1

        setPosition({
          x: normalizedX,
          y: normalizedY,
          normalizedX,
          normalizedY,
          rawX: clientX,
          rawY: clientY,
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return position;
};