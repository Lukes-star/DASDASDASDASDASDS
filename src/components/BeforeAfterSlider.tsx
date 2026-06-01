import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  before: string;
  after: string;
  label?: string;
}

export function BeforeAfterSlider({ before, after, label }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePos(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updatePos]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl select-none"
      style={{ aspectRatio: "16/9", cursor: "ew-resize", touchAction: "none" }}
      onMouseDown={() => { dragging.current = true; }}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      <img src={after} alt={`${label} posle`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />

      <div className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`${label} pre`}
          className="w-full h-full object-cover" draggable={false} />
      </div>

      <div className="absolute top-0 bottom-0 w-px bg-white/80"
        style={{ left: `${pos}%`, transform: "translateX(-50%)", boxShadow: "0 0 12px 2px rgba(255,255,255,0.4)" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg"
          style={{ boxShadow: "0 0 0 3px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.6)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 9L2 9M2 9L5 6M2 9L5 12" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9L16 9M16 9L13 6M16 9L13 12" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded pointer-events-none"
        style={{ background: "hsl(0 0% 6% / 0.88)", backdropFilter: "blur(4px)", opacity: pos > 18 ? 1 : 0, transition: "opacity 0.2s" }}>
        Pre
      </span>
      <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded text-white pointer-events-none"
        style={{ background: "hsl(0 82% 50%)", opacity: pos < 82 ? 1 : 0, transition: "opacity 0.2s" }}>
        Posle
      </span>

      {label && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold rounded-full pointer-events-none whitespace-nowrap"
          style={{ background: "hsl(0 0% 6% / 0.88)", backdropFilter: "blur(4px)" }}>
          {label}
        </span>
      )}
    </div>
  );
}
