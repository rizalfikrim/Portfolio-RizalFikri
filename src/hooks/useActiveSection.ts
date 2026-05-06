import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is 50% visible
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};