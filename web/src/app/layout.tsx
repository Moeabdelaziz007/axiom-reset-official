import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Axiom RESET - Egypt's First AI Operating System",
    description: "10 AI Agents for the MENA economy. 0% commission. Drivers keep 100%. Voice-first platform powered by Google Cloud.",
    keywords: ["AI", "Egypt", "MENA", "Agents", "Google Cloud", "Voice AI", "Delivery", "Restaurant"],
    authors: [{ name: "Mohamed Hossameldin Abdelaziz" }],
    icons: {
        icon: "/favicon.png",
        apple: "/logo.png",
    },
    openGraph: {
        title: "Axiom RESET - Egypt's First AI Operating System",
        description: "10 AI Agents for the MENA economy. 0% commission. Voice-first platform.",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Axiom RESET",
        description: "Egypt's First AI Operating System - 10 AI Agents",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" className={inter.variable}>
            <body className="min-h-screen bg-[#0A1628] text-white antialiased">
                {children}
            </body>
        </html>
    );
}
