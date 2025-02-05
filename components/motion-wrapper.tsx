"use client"

import { motion } from "framer-motion"
import type React from "react" // Import React

export function MotionDiv({
  children,
  className,
  initial,
  animate,
  transition,
}: {
  children: React.ReactNode
  className?: string
  initial?: any
  animate?: any
  transition?: any
}) {
  return (
    <motion.div className={className} initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  )
}

