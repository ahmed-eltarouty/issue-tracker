import "@radix-ui/themes/styles.css";
import '@/app/theme-config.css';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ 
    subsets: ["latin"],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: "Create Issues App",
    description: "Issues Tracker for testing purposes",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Theme accentColor="purple">
                    <NavBar />
                    <main className="p-5">{children}</main>
                </Theme>
            </body>
        </html>
    );
}
