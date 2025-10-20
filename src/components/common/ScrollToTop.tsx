"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="bg-primary hover:bg-primary/80 fixed right-6 bottom-20 cursor-pointer rounded-full p-3 text-white shadow-lg transition-colors md:bottom-6"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
