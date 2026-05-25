"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BookingShell } from "../../components/ReserveShell";
import { PageCanvas } from "../../components/PageCanvas";
import { EVENT_DATE, findSlot } from "../../lib/slots";

function ConfirmedContent() {
  const searchParams = useSearchParams();

  const slot = findSlot(searchParams.get("slot"));
  const email = searchParams.get("email") ?? "your inbox";

  return (
    <BookingShell
      title={<>You&rsquo;re in.</>}
      subtitle={
        <>
          Your time is locked. We&rsquo;ll send the address and the launch notes
          to <span className="white">{email}</span> in the next few minutes.
        </>
      }
    >
      <div className="booking-frame booking-frame--confirmed">
        <aside className="booking-aside booking-aside--confirmed">
          {/* Logo removed — it's already in the page header at the top. */}
          <div className="stamp-mark stamp-mark--badge-only">
            <div className="stamp-mark__cap t-label">Confirmed</div>
          </div>

          <div className="conf-time">
            <div className="t-label muted" style={{ letterSpacing: "0.22em" }}>
              You Step Into The Dream At
            </div>
            <div className="selected-time">{slot.time}</div>
            <div className="selected-date">{EVENT_DATE}</div>
            <div className="conf-time__range t-label">
              {slot.label} · Trinity Bellwoods, Toronto
            </div>
          </div>

          <div className="aside-card aside-card--soft">
            <div className="t-label" style={{ letterSpacing: "0.22em" }}>
              What To Expect
            </div>
            <ul>
              <li>A small room. About 800 sq ft.</li>
              <li>
                The first physical drop — hoodies, hats, pins, hourglasses.
              </li>
              <li>Bring whoever you want to bring.</li>
            </ul>
          </div>
        </aside>

        <div className="conf-pane">
          <div className="conf-section">
            <div className="t-label" style={{ letterSpacing: "0.22em" }}>
              What Happens Next
            </div>
            <ol className="conf-steps">
              <li>
                <span className="conf-step__num">01</span>
                <div>
                  <strong>Confirmation email.</strong>
                  <span>Address, parking notes, and a small map. Sent now.</span>
                </div>
              </li>
              <li>
                <span className="conf-step__num">02</span>
                <div>
                  <strong>Reminder, 24 hours before.</strong>
                  <span>
                    A short note so the day doesn&rsquo;t slip past you.
                  </span>
                </div>
              </li>
              <li>
                <span className="conf-step__num">03</span>
                <div>
                  <strong>Walk in at {slot.time}.</strong>
                  <span>Saturday, June 6 — Trinity Bellwoods, Toronto.</span>
                </div>
              </li>
            </ol>
          </div>

          <div className="conf-divider" />

          <div className="conf-actions">
            <button type="button" className="cta-cream">
              Add To Calendar
            </button>
            <button type="button" className="cta-outline">
              Copy Details
            </button>
          </div>
        </div>
      </div>
    </BookingShell>
  );
}

export default function ConfirmedPage() {
  return (
    <PageCanvas>
      <div className="step-fade">
        <Suspense fallback={null}>
          <ConfirmedContent />
        </Suspense>
      </div>
    </PageCanvas>
  );
}
