"use client";

import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('visible');
            observerRef.current?.unobserve(node);
          }
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
          ...options,
        }
      );
      observerRef.current.observe(node);
    }
  }, [options?.threshold, options?.rootMargin]);

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return ref;
}
