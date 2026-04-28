import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DesktopSidebar, MobileBottomNav } from "@/components/layout/sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "12xDesk — Real Estate CRM",
  description:
    "A mobile-first CRM for Indian real estate channel partners and brokers. Manage leads, track site visits, and broadcast property details on WhatsApp.",
  keywords: [
    "real estate CRM",
    "channel partner",
    "broker",
    "lead management",
    "WhatsApp",
    "property",
    "Mumbai",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full dark`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <TooltipProvider delayDuration={300}>
          {/* Desktop Sidebar */}
          <DesktopSidebar />

          {/* Main Content Area */}
          <main className="lg:ml-[240px] min-h-screen pb-20 lg:pb-0">
            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
              {children}
            </div>
          </main>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </TooltipProvider>
      </body>
    </html>
  );
}
