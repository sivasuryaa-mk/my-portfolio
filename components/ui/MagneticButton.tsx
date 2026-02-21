"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.3,
  as = "button",
  href,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: position,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      mass: 0.1,
    },
    className,
    "data-cursor": "pointer",
  };

  if (as === "a" && href) {
    return (
      <motion.a
        {...motionProps}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} disabled={disabled} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
