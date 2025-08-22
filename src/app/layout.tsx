import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MPC Psychology Center - Professional Mental Health Services",
    template: "%s | MPC Psychology Center",
  },
  description:
    "MPC Psychology Center offers evidence-based psychotherapy, counseling, and mental health services. Book your free consultation today for personalized care.",
  keywords: "psychology, therapy, mental health, counseling, psychotherapy, anxiety, depression, CBT, ACT, DBT, online therapy",
  authors: [{ name: "MPC Psychology Center" }],
  creator: "MPC Psychology Center",
  publisher: "MPC Psychology Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mpc-psychology.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://mpc-psychology.com",
    title: "MPC Psychology Center - Professional Mental Health Services",
    description: "MPC Psychology Center offers evidence-based psychotherapy, counseling, and mental health services. Book your free consultation today for personalized care.",
    siteName: "MPC Psychology Center",
    images: [
      {
        url: "/web.png",
        width: 1200,
        height: 630,
        alt: "MPC Psychology Center Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MPC Psychology Center - Professional Mental Health Services",
    description: "MPC Psychology Center offers evidence-based psychotherapy, counseling, and mental health services. Book your free consultation today for personalized care.",
    images: ["/web.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
