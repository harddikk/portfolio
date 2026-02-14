import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
    title: "Hardik - Builder | Developer | RESEARCHER",
    description: "Portfolio showcasing creative projects, development work, and acting career",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <ThemeProvider>
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
