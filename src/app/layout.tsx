import Script from 'next/script';
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence — Mon carnet d’habitudes",
  description: "Cadence, votre carnet d’habitudes. Visualisez vos progrès et cultivez votre régularité.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/assets/icon.svg", apple: "/assets/cadence-180.png" },
  appleWebApp: { capable: true, title: "Cadence" },
};

export const viewport: Viewport = {
  themeColor: "#17131f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <body>{children}<Script src="/_notifications/client.js" strategy="afterInteractive" /></body>
    </html>
  );
}
