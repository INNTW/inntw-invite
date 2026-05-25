export type Slot = {
  id: string;
  label: string;
  time: string;
  left: number;
  total: number;
};

export const SLOTS: Slot[] = [
  { id: "1pm", label: "1:00 PM - 2:00 PM", time: "1:00 PM", left: 18, total: 20 },
  { id: "2pm", label: "2:00 PM - 3:00 PM", time: "2:00 PM", left: 20, total: 20 },
  { id: "3pm", label: "3:00 PM - 4:00 PM", time: "3:00 PM", left: 19, total: 20 },
  { id: "4pm", label: "4:00 PM - 5:00 PM", time: "4:00 PM", left: 20, total: 20 },
  { id: "5pm", label: "5:00 PM - 6:00 PM", time: "5:00 PM", left: 20, total: 20 },
];

export const EVENT_DATE = "Saturday, June 6";

export function findSlot(id: string | null | undefined): Slot {
  return SLOTS.find((s) => s.id === id) ?? SLOTS[0]; // default to first slot (1pm)
}

/**
 * Deterministic reservation code derived from the form payload.
 * Mirrors the prototype so the same details always render the same code.
 */
export function reservationCode(seed: string): string {
  const cleaned = seed.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let h = 0;
  for (let i = 0; i < cleaned.length; i++) {
    h = (h * 31 + cleaned.charCodeAt(i)) >>> 0;
  }
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[h % chars.length];
    h = Math.floor(h / chars.length) + 7;
  }
  return `INNTW-${out.slice(0, 3)}-${out.slice(3)}`;
}
