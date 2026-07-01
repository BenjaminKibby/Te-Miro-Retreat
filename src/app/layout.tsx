import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aspinretreat.co.nz"),
  title: {
    default: "Aspin Retreat | Cambridge Holiday Home",
    template: "%s | Aspin Retreat",
  },
  description:
    "A premium five-bedroom Cambridge holiday home near Lake Karapiro, Te Miro trails and Mystery Creek, with rural views, group accommodation, private sauna, fast Wi-Fi and direct booking enquiries.",
  keywords: [
    "Aspin Retreat",
    "luxury accommodation Cambridge Waikato",
    "Te Miro retreat",
    "holiday home near Lake Karapiro",
    "accommodation near Mystery Creek",
    "group accommodation Cambridge NZ",
    "private sauna accommodation Waikato",
    "Te Miro luxury accommodation",
    "luxury accommodation Cambridge NZ",
    "Waikato holiday home",
    "Cambridge rural retreat",
    "Lake Karapiro accommodation",
    "Te Miro mountain bike accommodation",
    "private sauna holiday rental",
  ],
  openGraph: {
    title: "Aspin Retreat",
    description:
      "A peaceful Cambridge holiday home for family gatherings, local events, wellness weekends and direct-booking rural stays.",
    type: "website",
    locale: "en_NZ",
    url: "https://aspinretreat.co.nz",
    images: [
      {
        url: "/images/exterior-tree-framed.jpeg",
        width: 2048,
        height: 768,
        alt: "White rural holiday home near Cambridge, Waikato",
      },
    ],
  },
  alternates: {
    canonical: "https://aspinretreat.co.nz",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
