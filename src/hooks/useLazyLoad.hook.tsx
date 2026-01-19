import { useState, useEffect, useRef } from "react";
import Taro from "@tarojs/taro";

interface UseLazyLoadOptions {
  viewport?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  placeholder?: string;
}

export const useLazyLoad = (src: string, options: UseLazyLoadOptions = {}) => {
  const { viewport = { bottom: 0 }, placeholder = "" } = options;

  const [showed, setShowed] = useState(false);
  const observerRef = useRef<Taro.IntersectionObserver | null>(null);

  const uniqueClassRef = useRef(
    `lazy-${Math.random().toString(36).substring(2)}`
  );
  const uniqueClass = uniqueClassRef.current;

  const clean = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  useEffect(() => {
    if (showed) return;
    if (!Taro.createIntersectionObserver) {
      setShowed(true);
      return;
    }

    try {
      const currentPage = Taro.getCurrentInstance().page;
      const observer = Taro.createIntersectionObserver(currentPage, {
        thresholds: [0],
        initialRatio: 0,
        observeAll: false,
      });

      observer.relativeToViewport(viewport).observe(`.${uniqueClass}`, () => {
        setShowed(true);
        clean();
      });

      observerRef.current = observer;
    } catch (error) {
      console.warn("IntersectionObserver error:", error);
      setShowed(true);
    }

    return () => {
      clean();
    };
  }, [uniqueClass, viewport, clean, showed]);

  const currentSrc = showed ? src : placeholder;

  return {
    uniqueClass,
    currentSrc,
    isVisible: showed,
  };
};
