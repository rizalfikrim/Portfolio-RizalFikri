import { useEffect, useState } from 'react';

export interface ScrollProgress {
  scrollY: number;
  scrollProgress: number;
  scrollDirection: 'up' | 'down';
}

export const useScrollProgress = (): ScrollProgress => {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollData = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = documentHeight > 0 ? scrollY / documentHeight : 0;

      const scrollDirection: 'up' | 'down' = scrollY > lastScrollY ? 'down' : 'up';

      setScrollData({
        scrollY,
        scrollProgress: Math.min(scrollProgress, 1), // Cap at 1
        scrollDirection,
      });

      lastScrollY = scrollY;
    };

    const throttledUpdate = () => {
      requestAnimationFrame(updateScrollData);
    };

    // Initial call
    updateScrollData();

    // Add scroll listener
    window.addEventListener('scroll', throttledUpdate, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, []);

  return scrollData;
};