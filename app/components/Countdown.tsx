"use client";

import { useEffect, useState } from "react";

// Grand opening target. Held as a constant so it's trivial to adjust.
const TARGET = new Date("2026-06-06T12:00:00-04:00").getTime();

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getParts(now: number) {
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="cu">
      <div className="cu__value" suppressHydrationWarning>
        {value}
      </div>
      <div className="cu__label">{label}</div>
    </div>
  );
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // First tick syncs SSR placeholder to the client clock; the interval
    // keeps it ticking. The eslint-disable below is intentional — the rule
    // doesn't account for SSR hydration-safe placeholder patterns.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = getParts(now ?? TARGET);

  return (
    <div className="countdown">
      <div className="countdown__eyebrow">Doors Open In</div>
      <div className="countdown__row">
        <Unit value={String(parts.days)} label="Days" />
        <Unit value={pad(parts.hours)} label="Hours" />
        <Unit value={pad(parts.minutes)} label="Min" />
        <Unit value={pad(parts.seconds)} label="Sec" />
      </div>
    </div>
  );
}
