import { ReactNode } from "react";

/**
 * Cobalt canvas with the soft "sky" radial ellipses layered on top.
 * Used by every route — landing, slot, details, confirmed.
 */
export function PageCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <div className="sky" aria-hidden="true" />
      {children}
    </div>
  );
}
