import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { Inter, Fira_Code } from "next/font/google";
import ContextProviders from "@/components/context/ContextProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prompt Chef | AI Prompt Creator",
    description:
        "Prompt Chef is an easy-to-use, free AI prompt creator for writers, marketers, artists, and more.",
    openGraph: {
        title: "Prompt Chef | AI Prompt Creator",
        description:
            "Prompt Chef is an easy-to-use, free AI prompt creator for writers, marketers, artists, and more.",
        url: "https://promptchef.oxen.dev",
        siteName: "Prompt Chef",
        images: [
            {
                url: "/assets/meta/og-1.webp",
                width: 1200,
                height: 630,
                alt: "Prompt Chef title card",
            },
            {
                url: "/assets/meta/og-2.webp",
                width: 1800,
                height: 1600,
                alt: "Prompt Chef title card",
            },
        ],
        locale: "en-CA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Prompt Chef | AI Prompt Creator",
        description:
            "Prompt Chef is an easy-to-use, free AI prompt creator for writers, marketers, artists, and more.",
        // siteId: '1467726470533754880',
        // creator: '@oxen.dev',
        // creatorId: '1467726470533754880',
        images: ["/assets/meta/og-2.webp"],
    },
    themeColor: "#232323",
    icons: {
        icon: "/favicon.ico",
        apple: "/assets/meta/apple-touch-icon.png",
        other: [
            {
                rel: "mask-icon",
                url: "/assets/meta/mask.svg",
            },
        ],
    },
    appleWebApp: {
        title: "Prompt Chef",
        statusBarStyle: "black-translucent",
    },
    category: "productivity",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const mono = Fira_Code({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-fira-code",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${mono.variable}`}>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <ContextProviders>
                    <Navbar />
                    {children}
                </ContextProviders>
            </body>
        </html>
    );
}
