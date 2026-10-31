import { useEffect } from "react";

// Pointer ki exact jagah par ripple ke CSS variables set karta hai.
export default function useButtonRipple() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const addRipple = (event) => {
      if (!(event.target instanceof Element)) return;

      const button = event.target.closest(".btn");
      if (!button || button.matches(":disabled")) return;

      const bounds = button.getBoundingClientRect();
      button.style.setProperty("--ripple-x", `${event.clientX - bounds.left}px`);
      button.style.setProperty("--ripple-y", `${event.clientY - bounds.top}px`);
      button.style.setProperty("--ripple-size", `${Math.max(bounds.width, bounds.height)}px`);
      button.classList.remove("ripple-active");
      void button.offsetWidth;
      button.classList.add("ripple-active");
    };

    const clearRipple = (event) => {
      if (event.target instanceof Element && event.target.matches(".btn")) {
        event.target.classList.remove("ripple-active");
      }
    };

    document.addEventListener("pointerdown", addRipple);
    document.addEventListener("animationend", clearRipple);

    return () => {
      document.removeEventListener("pointerdown", addRipple);
      document.removeEventListener("animationend", clearRipple);
    };
  }, []);
}
