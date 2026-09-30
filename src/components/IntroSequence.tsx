import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Every era",
"Every story",
"Remembered.",
];

export function IntroSequence() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("wte-intro-seen");
  });
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setLineIdx(1), 1600));
    timers.push(window.setTimeout(() => setLineIdx(2), 2800));
    timers.push(window.setTimeout(() => skip(), 5400));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const skip = () => {
    sessionStorage.setItem("wte-intro-seen", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-300 flex items-center justify-center bg-black text-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glitter burst */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 80 }).map((_, i) => {
              const angle = (i / 80) * Math.PI * 2;
              const dist = 100 + Math.random() * 400;
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-0.5 w-0.5 bg-white"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                  }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                />
              );
            })}
          </div>

          {/* Vinyl */}
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute h-72 w-72 opacity-40"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: [0, 0.4, 0] }}
            transition={{
              rotate: { duration: 6, ease: "linear", repeat: Infinity },
              opacity: { duration: 4, times: [0, 0.5, 1] },
            }}
          >
            <circle cx="100" cy="100" r="98" fill="#0a0a0a" stroke="#fff" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth="0.2" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" strokeWidth="0.2" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#fff" strokeWidth="0.2" />
            <circle cx="100" cy="100" r="18" fill="#dc2626" />
            <circle cx="100" cy="100" r="3" fill="#0a0a0a" />
          </motion.svg>

          {/* Lyric */}
          <div className="relative z-10 px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="font-script text-2xl md:text-3xl"
              >
                {LINES[lineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={skip}
            className="absolute bottom-6 right-6 text-[10px] tracked-tight opacity-60 hover:opacity-100"
          >
            SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
