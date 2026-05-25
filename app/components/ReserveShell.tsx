import { ReactNode } from "react";
import { Logo } from "./Logo";
import { Countdown } from "./Countdown";

/**
 * Booking-page chrome shared by slot picker, details, and confirmed.
 * Header is intentionally identical to the landing page (logo + brand +
 * countdown) so the chrome feels continuous as the user moves through the
 * flow — the only difference is the "— Reservation" suffix in the brand.
 */
export function BookingShell({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page--booking">
      <header className="booking-top">
        <span className="booking-top__logo">
          <Logo />
        </span>
        <div className="booking-top__brand">
          <span className="t-label" style={{ marginRight: 16 }}>
            If Not Now Then When
          </span>
          <span className="t-label muted">Grand Opening — Reservation</span>
        </div>
        <Countdown />
      </header>

      <main className="booking-main">
        <div className="booking-head">
          <h1 className="booking-title">{title}</h1>
          {subtitle && <p className="booking-subtitle">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
