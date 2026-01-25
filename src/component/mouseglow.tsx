import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(
          500px circle at ${pos.x}px ${pos.y}px,
          rgba(255,255,255,0.12),
          transparent 60%
        )`,
        zIndex: 0,
      }}
    />
  );
}
