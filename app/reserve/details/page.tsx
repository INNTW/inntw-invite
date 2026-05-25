"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { BookingShell } from "../../components/ReserveShell";
import { PageCanvas } from "../../components/PageCanvas";
import { ArrowLeft, CheckIcon } from "../../components/icons";
import { EVENT_DATE, findSlot } from "../../lib/slots";

function DetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slotId = searchParams.get("slot");
  const slot = findSlot(slotId);

  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    // Mandatory consent — pre-checked, but the user can untoggle it. If
    // they do, the submit button is disabled (they have to opt in to
    // receive the address and the launch details).
    consentEmails: true,
    // Both optional opt-ins start pre-selected so users have to actively
    // untoggle them if they don't want the free pin / SMS updates.
    optEmail: true,
    optSms: true,
  });

  const valid =
    form.first.trim() !== "" &&
    form.last.trim() !== "" &&
    /.+@.+\..+/.test(form.email) &&
    form.consentEmails;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const params = new URLSearchParams({
      slot: slot.id,
      first: form.first,
      last: form.last,
      email: form.email,
    });
    router.push(`/reserve/confirmed?${params.toString()}`);
  }

  return (
    <BookingShell
      title="Reserve Your Spot"
      subtitle="Choose a launch window. Confirm your time, then add the details for your booking."
    >
      <div className="booking-frame">
        <aside className="booking-aside">
          <button
            type="button"
            className="link-back"
            onClick={() => router.push("/reserve")}
          >
            <ArrowLeft size={14} />
            <span>Change Time</span>
          </button>

          <div className="selected-block">
            <div className="t-label muted" style={{ letterSpacing: "0.22em" }}>
              Selected Time
            </div>
            <div className="selected-time">{slot.time}</div>
            <div className="selected-date">{EVENT_DATE}</div>
          </div>

        </aside>

        <form className="form-pane" onSubmit={onSubmit}>
          <div className="form-head">
            <div className="t-label" style={{ letterSpacing: "0.22em" }}>
              Your Details
            </div>
            <p>Enter the contact details for your booking confirmation.</p>
          </div>

          <div className="form-divider" />

          <div className="form-row form-row--two">
            <Field
              label="First Name"
              value={form.first}
              onChange={(v) => update("first", v)}
              autoComplete="given-name"
              autoFocus
            />
            <Field
              label="Last Name"
              value={form.last}
              onChange={(v) => update("last", v)}
              autoComplete="family-name"
            />
          </div>

          <div className="form-row">
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              autoComplete="email"
            />
          </div>

          <div className="form-row">
            <Field
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              autoComplete="tel"
              placeholder="+1"
            />
          </div>

          <div className="form-divider" />

          {/* Mandatory consent — pre-checked but toggleable. Unchecking it
              disables Reserve Launch Time below. Wrapped so its check icon
              lines up with the two optional checkboxes inside .opt-grid
              (which indents its contents by 14px). */}
          <div className="check-row-indent">
            <CheckRow
              checked={form.consentEmails}
              onToggle={() => update("consentEmails", !form.consentEmails)}
            >
              Send me emails related to this event{" "}
              <span className="muted">(including address and details)</span>
            </CheckRow>
          </div>

          <div className="form-divider" />

          {/* Two-column on desktop: optional opt-ins on the left, pin offer
              on the right. Stacks (checkboxes → pin) on mobile. */}
          <div className="opt-grid">
            <div className="opt-grid__checks">
              <CheckRow
                checked={form.optEmail}
                onToggle={() => update("optEmail", !form.optEmail)}
              >
                Send me email promotions and launch offers.
              </CheckRow>

              <CheckRow
                checked={form.optSms}
                onToggle={() => update("optSms", !form.optSms)}
              >
                Send me SMS promotions and launch offers. Message and data
                rates may apply. Reply STOP to unsubscribe.
              </CheckRow>
            </div>

            <div className="pin-offer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/pins.png"
                alt="If Not Now Then When enamel pins — white, black, and green"
                className="pin-offer__image"
              />
              <p className="pin-offer__note">
                Sign up for both checkboxes, and I&rsquo;ll have a{" "}
                <em>free &ldquo;If Not Now Then When&rdquo; pin</em> waiting
                for you when you arrive.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="cta-cream cta-cream--block"
            disabled={!valid}
          >
            Reserve Your Spot
          </button>

          <p className="form-foot">
            By reserving you agree to our terms. One spot per email. Reservations
            are free.
          </p>
        </form>
      </div>
    </BookingShell>
  );
}

export default function DetailsPage() {
  return (
    <PageCanvas>
      <div className="step-fade">
        <Suspense fallback={null}>
          <DetailsContent />
        </Suspense>
      </div>
    </PageCanvas>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoFocus,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className="field__input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        spellCheck={false}
      />
    </label>
  );
}

function CheckRow({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="check-row" onClick={onToggle}>
      <span className={`check-box ${checked ? "is-on" : ""}`}>
        {checked && <CheckIcon size={12} />}
      </span>
      <span style={{ textAlign: "left" }}>{children}</span>
    </button>
  );
}

