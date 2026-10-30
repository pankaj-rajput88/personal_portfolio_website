import { useEffect, useRef } from "react";

// Is hook se section ke andar ke reveal elements ko ek baar observe karte hain.
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    root.classList.add("reveal-ready");
    const targets = [
      ...(root.matches("[data-reveal]") ? [root] : []),
      ...root.querySelectorAll("[data-reveal]"),
    ];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.setAttribute("data-revealed", "true"));
      return () => root.classList.remove("reveal-ready");
    }

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-revealed", "true"));
      return () => root.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return ref;
}
