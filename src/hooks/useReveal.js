import { useEffect, useRef } from "react";

const revealSelector = [
  "[data-reveal]",
  "h2",
  ".skill-card",
  ".project-card",
  ".timeline-item",
  ".facts",
  ".contact-form",
  ".direct-card",
].join(",");

const focusSelector = ".skill-card,.project-card,.direct-card";

// Section ke headings aur cards ko ek baar reveal karte hain.
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const targets = [
      ...(root.matches(revealSelector) ? [root] : []),
      ...root.querySelectorAll(revealSelector),
    ];
    const addedRevealAttributes = targets.filter((target) => !target.hasAttribute("data-reveal"));

    addedRevealAttributes.forEach((target) => target.setAttribute("data-reveal", ""));
    root.classList.add("reveal-ready");

    const clearRevealState = () => {
      root.classList.remove("reveal-ready");
      targets.forEach((target) => target.removeAttribute("data-revealed"));
      addedRevealAttributes.forEach((target) => target.removeAttribute("data-reveal"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.setAttribute("data-revealed", "true"));
      return clearRevealState;
    }

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-revealed", "true"));
      return clearRevealState;
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

    let focusedTarget = null;
    let focusObserver = null;
    if (window.matchMedia("(hover: none)").matches) {
      focusObserver = new IntersectionObserver((entries) => {
        const nextTarget = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]?.target;

        if (nextTarget && nextTarget !== focusedTarget) {
          focusedTarget?.classList.remove("in-focus");
          focusedTarget = nextTarget;
          focusedTarget.classList.add("in-focus");
        }

        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.target === focusedTarget) {
            focusedTarget.classList.remove("in-focus");
            focusedTarget = null;
          }
        });
      }, { threshold: 0, rootMargin: "-42% 0px -42% 0px" });

      targets
        .filter((target) => target.matches(focusSelector))
        .forEach((target) => focusObserver.observe(target));
    }

    return () => {
      observer.disconnect();
      focusObserver?.disconnect();
      focusedTarget?.classList.remove("in-focus");
      clearRevealState();
    };
  }, []);

  return ref;
}
