// Pointer ki position card par save hoti hai; CSS isi jagah glow dikhata hai.
export default function useSpotlight() {
  const onPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return { onPointerMove };
}
