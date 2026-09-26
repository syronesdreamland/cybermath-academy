import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberMath Academy",
  description:
    "Structured learning tracker for Cybersecurity (90-day plan) and Mathematics (Professor Dave Explains).",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
