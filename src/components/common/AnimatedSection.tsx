"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AnimateSection({
  children,
  id,
  forceAnimate = false,
}: {
  children: ReactNode;
  id?: string;
  forceAnimate?: boolean; // Tambahan opsional
}) {
  return (
    <motion.div
      id={id}
      initial="hidden"
      animate={forceAnimate ? "show" : undefined}
      whileInView={forceAnimate ? undefined : "show"}
      viewport={{ once: true }}
      variants={fadeInVariant}
    >
      {children}
    </motion.div>
  );
}
