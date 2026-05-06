'use client';

import { useEffect, useRef } from 'react';
import { useCursorPosition } from '../../hooks/useCursorPosition';

export const CustomCursor = () => {
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const { x, y, rawX, rawY } = useCursorPosition();

  // Track cursor position with refs to avoid stale closures
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const outerPosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update cursor position tracking
      cursorPosRef.current = { x: clientX, y: clientY };

      // Inner cursor updates immediately
      if (innerCursorRef.current) {
        innerCursorRef.current.style.left = `${clientX}px`;
        innerCursorRef.current.style.top = `${clientY}px`;
      }
    };

    // Smooth animation loop for outer cursor
    const animateCursor = () => {
      const targetX = cursorPosRef.current.x;
      const targetY = cursorPosRef.current.y;
      const currentX = outerPosRef.current.x;
      const currentY = outerPosRef.current.y;

      // Lerp with higher factor for snappier response (changed from 0.15 to 0.25)
      const newX = currentX + (targetX - currentX) * 0.25;
      const newY = currentY + (targetY - currentY) * 0.25;

      outerPosRef.current = { x: newX, y: newY };

      if (outerCursorRef.current) {
        outerCursorRef.current.style.left = `${newX}px`;
        outerCursorRef.current.style.top = `${newY}px`;
      }

      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Check if element is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        (target instanceof Element && target.getAttribute('role') === 'button');
      
      if (isInteractive) {
        if (outerCursorRef.current) {
          outerCursorRef.current.style.transform = 'scale(1.8)';
          outerCursorRef.current.style.borderColor = '#7c3aed';
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Check if element is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        (target instanceof Element && target.getAttribute('role') === 'button');
      
      if (isInteractive) {
        if (outerCursorRef.current) {
          outerCursorRef.current.style.transform = 'scale(1)';
          outerCursorRef.current.style.borderColor = '#00d4ff';
        }
      }
    };

    const handleClick = () => {
      if (innerCursorRef.current && outerCursorRef.current) {
        innerCursorRef.current.style.transform = 'scale(0.6)';
        outerCursorRef.current.style.transform = 'scale(1.3)';

        setTimeout(() => {
          if (innerCursorRef.current && outerCursorRef.current) {
            innerCursorRef.current.style.transform = 'scale(1)';
            outerCursorRef.current.style.transform = 'scale(1)';
          }
        }, 100);
      }
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateCursor);

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Inner cursor (precise, fast) */}
      <div
        ref={innerCursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Outer cursor (follows smoothly) */}
      <div
        ref={outerCursorRef}
        className="fixed top-0 left-0 w-7 h-7 border-2 rounded-full pointer-events-none z-[9998]"
        style={{
          borderColor: '#00d4ff',
          transform: 'translate(-50%, -50%)',
          transition: 'border-color 0.2s ease, transform 0.15s ease-out',
          boxShadow: '0 0 12px rgba(0, 212, 255, 0.3)',
        }}
      />
    </>
  );
};