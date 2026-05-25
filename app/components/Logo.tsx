import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string;
  /** Render as a link (default) or a bare img (used inside other links/blocks) */
  asLink?: boolean;
};

/**
 * INNTW stamp logo. The source asset is black-on-transparent, inverted to
 * white via CSS filter so it sits on the cobalt canvas.
 */
export function Logo({ className = "", href = "/", asLink = true }: LogoProps) {
  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/assets/logo-stamp-black.png"
      alt="If Not Now Then When"
      className={`logo-stamp ${className}`}
      draggable={false}
    />
  );

  if (!asLink) return img;

  return (
    <Link href={href} aria-label="If Not Now Then When — Home">
      {img}
    </Link>
  );
}
