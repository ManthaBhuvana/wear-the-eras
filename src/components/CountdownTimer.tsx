import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer({ hours = 50 }: { hours?: number }) {
  const target = useState(() => Date.now() + hours * 3600 * 1000)[0];
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <div className="flex items-center gap-3 text-[13px] tracked-tight">
      <span className="opacity-70">ENDS IN</span>
      <span className="font-mono">
        {pad(h)} : {pad(m)} : {pad(s)}
      </span>
    </div>
  );
}
