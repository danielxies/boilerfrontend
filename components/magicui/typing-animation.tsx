"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TypingAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [elements, setElements] = useState<React.ReactNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Split children into array of elements on mount
  useEffect(() => {
    if (React.isValidElement(children)) {
      const childArray = React.Children.toArray(children);
      setElements(childArray);
    }
  }, [children]);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started || elements.length === 0) return;

    const typingEffect = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < elements.length) {
          return prev + 1;
        }
        clearInterval(typingEffect);
        return prev;
      });
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [elements.length, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {elements.slice(0, currentIndex)}
    </MotionComponent>
  );
}
