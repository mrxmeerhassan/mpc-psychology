import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SEO from "@/components/SEO";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "MPC Psychology Center - Professional Mental Health Services",
	description: "MPC Psychology Center offers professional therapy, counseling, and mental health services. Book your free consultation today.",
	keywords: "psychology, therapy, counseling, mental health, therapist, psychologist, anxiety, depression, stress, MPC Psychology Center",
	authors: [{ name: "MPC Psychology Center" }],
	creator: "MPC Psychology Center",
	publisher: "MPC Psychology Center",
	robots: "index, follow",
	openGraph: {
		title: "MPC Psychology Center - Professional Mental Health Services",
		description: "Professional therapy and counseling services. Book your free consultation today.",
		url: "https://mpc-psychological-center.vercel.app",
		siteName: "MPC Psychology Center",
		images: [
			{
				url: "https://mpc-psychological-center.vercel.app/web.png",
				width: 1200,
				height: 630,
				alt: "MPC Psychology Center Logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "MPC Psychology Center - Professional Mental Health Services",
		description: "Professional therapy and counseling services. Book your free consultation today.",
		images: ["https://mpc-psychological-center.vercel.app/web.png"],
	},
	verification: {
		google: "your-google-verification-code", // Add your Google verification code here
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				{/* Google Analytics */}
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'GA_MEASUREMENT_ID');
					`}
				</Script>
				
				{/* Google Search Console Verification */}
				<meta name="google-site-verification" content="your-verification-code" />
				
				{/* Other SEO Meta Tags */}
				<link rel="canonical" href="https://mpc-psychological-center.vercel.app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#0ea5e9" />
				<link rel="icon" href="/web.png" />
				<link rel="apple-touch-icon" href="/web.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className={inter.className}>
				<SEO />
				<NavBar />
				{children}
			</body>
		</html>
	);
}
