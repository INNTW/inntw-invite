"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookingShell } from "../components/ReserveShell";
import { PageCanvas } from "../components/PageCanvas";
import { ArrowLeft } from "../components/icons";
import { EVENT_DATE, SLOTS, type Slot } from "../lib/slots";

export default function ReservePage() {
  const router = useRouter();
  // Default selection — auto-picks the earliest slot.
  const [selectedId, setSelectedId] = useState<string | null>("1pm");
  const slot = SLOTS.find((s) => s.id === selectedId) ?? null;

  function confirm() {
    if (!slot) return;
    router.push(`/reserve/details?slot=${slot.id}`);
  }

  return (
    <PageCanvas>
      <div className="step-fade">
        <BookingShell
          title="Reserve Your Spot"
          subtitle="Choose a launch window. Confirm your time, then add the details for your booking."
        >
          <div className="booking-frame">
            <aside className="booking-aside">
              <button
                type="button"
                className="link-back"
                onClick={() => router.push("/")}
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <div className="selected-block">
                <div className="t-label muted" style={{ letterSpacing: "0.22em" }}>
                  Selected Time
                </div>
                {slot ? (
                  <>
                    <div className="selected-time">{slot.time}</div>
                    <div className="selected-date">{EVENT_DATE}</div>
                  </>
                ) : (
                  <>
                    <div className="selected-time selected-time--empty">— : — —</div>
                    <div className="selected-empty-note">
                      Pick a launch window to continue.
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className="cta-cream"
                onClick={confirm}
                disabled={!slot}
              >
                Confirm Time
              </button>

              <div className="aside-note">
                <div className="t-label" style={{ letterSpacing: "0.22em" }}>
                  About This Room
                </div>
                <p>
                  20 people per window. Stay as long as you like. Quiet music,
                  things to look at, an hourglass running on the table.
                </p>
              </div>
            </aside>

            <div className="slot-grid">
              {SLOTS.map((s) => (
                <SlotCard
                  key={s.id}
                  slot={s}
                  selected={selectedId === s.id}
                  onSelect={() => setSelectedId(s.id)}
                />
              ))}
            </div>
          </div>
        </BookingShell>
      </div>
    </PageCanvas>
  );
}

function SlotCard({
  slot,
  selected,
  onSelect,
}: {
  slot: Slot;
  selected: boolean;
  onSelect: () => void;
}) {
  const filled = slot.total - slot.left;
  const pct = Math.round((filled / slot.total) * 100);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`slot-card ${selected ? "is-selected" : ""}`}
    >
      <span className={`slot-radio ${selected ? "is-on" : ""}`}>
        <span className="slot-radio__dot" />
      </span>
      <div className="slot-card__label">{slot.label}</div>
      <div className="slot-card__bar">
        <div
          className="slot-card__bar-fill"
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
      <div className="slot-card__meta">
        <span>{slot.left} Spots Left</span>
        <span className="muted">{slot.total} Total</span>
      </div>
    </button>
  );
}
