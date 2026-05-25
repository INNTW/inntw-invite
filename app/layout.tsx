import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://inntw-invite.vercel.app";
const SITE_TITLE = "If Not Now Then When Grand Opening";
const SITE_DESCRIPTION =
  "Grand opening reservation. Pick your launch window. Saturday, June 6 — Trinity Bellwoods, Toronto.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "If Not Now Then When",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
