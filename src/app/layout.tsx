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
  metadataBase: new URL("https://waikatoruralretreat.co.nz"),
  title: {
    default: "Te Miro Luxury Rural Retreat | Cambridge Waikato Holiday Home",
    template: "%s | Te Miro Luxury Retreat",
  },
  description:
    "A premium five-bedroom holiday home in the Te Miro countryside near Cambridge, Waikato with rural views, private sauna, spacious living, fast Wi-Fi, Sky Sport and easy access to Lake Karapiro and Te Miro trails.",
  keywords: [
    "Te Miro luxury accommodation",
    "luxury accommodation Cambridge NZ",
    "Waikato holiday home",
    "Cambridge rural retreat",
    "Lake Karapiro accommodation",
    "Te Miro mountain bike accommodation",
    "private sauna holiday rental",
  ],
  openGraph: {
    title: "Te Miro Luxury Rural Retreat",
    description:
      "A peaceful Te Miro and Cambridge escape for family gatherings, wellness weekends and direct-booking rural luxury.",
    type: "website",
    locale: "en_NZ",
    images: [
      {
        url: "/images/exterior-tree-framed.jpeg",
        width: 2048,
        height: 768,
        alt: "White rural holiday home near Cambridge, Waikato",
      },
    ],
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
