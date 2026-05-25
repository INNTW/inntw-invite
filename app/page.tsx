import Link from "next/link";
import { Countdown } from "./components/Countdown";
import { Logo } from "./components/Logo";
import { PageCanvas } from "./components/PageCanvas";
import {
  ArrowRight,
  CalendarIcon,
  ClockIcon,
  PinIcon,
} from "./components/icons";

export default function Home() {
  return (
    <PageCanvas>
      <div className="page--landing step-fade">
        <header className="top-bar">
          <span className="top-bar__logo">
            <Logo />
          </span>
          <div className="top-bar__brand">
            <span className="t-label" style={{ marginRight: 16 }}>
              If Not Now Then When
            </span>
            <span className="t-label muted">Grand Opening</span>
          </div>
          <Countdown />
        </header>

        <div className="hairline" style={{ margin: "16px 0 0" }} />

        <main className="landing-main">
          <h1 className="landing-display">
            If Not Now
            <br />
            Then When
          </h1>

          <div className="landing-sub">
            <p>The Grand Opening.</p>
            <p>The first time this dream leaves my head and enters the world.</p>
            <p>I invite you to be part of my first chapter.</p>
          </div>

          <Link href="/reserve" className="cta-primary">
            <span>Step Into The Dream</span>
            <ArrowRight />
          </Link>

          {/* Caption stacks visually with the CTA — no auto-margin gap above. */}
          <div className="cta-caption">
            <ClockIcon size={18} />
            <span>Lock in your time slot.</span>
          </div>

          <div className="landing-meta">
            <div className="meta-row">
              <PinIcon size={18} />
              <span className="t-label" style={{ letterSpacing: "0.2em" }}>
                Trinity Bellwoods, Toronto
              </span>
            </div>
            <p className="meta-blurb">
              This is a small pop up shop to launch the brand. Due to
              capacity limits, you&rsquo;ll pick a time to come in.
            </p>
            <div className="meta-row">
              <CalendarIcon size={18} />
              <span className="t-label" style={{ letterSpacing: "0.2em" }}>
                June 6th, 2026
              </span>
            </div>
          </div>
        </main>
      </div>
    </PageCanvas>
  );
}
