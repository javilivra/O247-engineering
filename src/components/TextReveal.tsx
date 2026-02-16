"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerSpeed?: number; // ms between each char, default 25
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  staggerSpeed = 25,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split into words, track global char index for stagger timing
  const words = children.split(" ");
  let globalCharIndex = 0;

  return (
    <div ref={containerRef}>
      <Tag className={className} style={{ overflowWrap: "break-word" }}>
        {words.map((word, wordIdx) => {
          const startIndex = globalCharIndex;
          globalCharIndex += word.length + 1; // +1 for the space

          return (
            <span
              key={wordIdx}
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: delay + (startIndex + charIdx) * (staggerSpeed / 1000),
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Space between words — also animated */}
              {wordIdx < words.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{
                    duration: 0.1,
                    delay: delay + (startIndex + word.length) * (staggerSpeed / 1000),
                  }}
                  style={{ display: "inline-block", width: "0.3em" }}
                >
                  {"\u00A0"}
                </motion.span>
              )}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}