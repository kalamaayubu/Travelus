import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AIAssistantBtn from "@/components/AIAssistantBtn";
import AIAssistant from "@/components/AIAssistant";

export const metadata: Metadata = {
  title: {
    default: "Travelus",
    template: "%s | Travelus",
  },
  description: `Travelus is a ride-sharing platform in Kenya. 
   Connect drivers with empty seats to passengers, save costs, and travel reliably.
  `,
  keywords: [
    "Travelus",
    "ride-sharing",
    "carpooling",
    "transportation",
    "commuting",
    "travel",
    "bus booking",
    "vehicle sharing",
    "Kenya transport",
    "rides",
    "drivers",
    "passengers",
    "shared rides",
    "eco-friendly travel",
    "cost-effective travel",
    "community travel",
    "sustainable transportation",
  ],
  authors: [{ name: "Travelus", url: "https://travelusapp.netlify.app" }],
  creator: "Kalama Ayubu",
  metadataBase: new URL("https://travelusapp.netlify.app"),
  openGraph: {
    title: "Travelus – Smart Ride Sharing",
    description: `Travelus is a modern ride-sharing platform that connects drivers with empty seats to passengers heading the same way. 
    During peak times—like school openings or when public vehicles are full—it provides a reliable alternative. 
    Even outside rush hours, it remains a smart choice: drivers earn from seats that would otherwise go empty by 
    offering rides at a relatively lower cost, and passengers enjoy a smooth, affordable, and reliable journey
    `,
    url: "https://travelusapp.netlify.app",
    siteName: "Travelus",
    images: [
      {
        url: "/assets/screenshots/og-mobileHero.png",
        width: 800,
        height: 600,
        alt: "Travelus Mobile Preview",
      },
      {
        url: "/assets/screenshots/og-desktopHero.png",
        width: 1800,
        height: 1600,
        alt: "Travelus Desktop Preview",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelus – Smart Ride Sharing",
    description: `Travelus is a modern ride-sharing platform that connects drivers with empty seats to passengers heading the same way. 
    During peak times—like school openings or when public vehicles are full—it provides a reliable alternative. 
    Even outside rush hours, it remains a smart choice: drivers earn from seats that would otherwise go empty by 
    offering rides at a relatively lower cost, and passengers enjoy a smooth, affordable, and reliable journey
    `,
    images: ["/assets/screenshots/og-desktopHero.png"],
    creator: "@Travelus",
  },
  icons: {
    icon: "/assets/logo.svg",
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`antialiased bg-gray-950 text-gray-200 scroll-smooth`}>
        <ReduxProvider>
          <NavBar />
          {children}
          <Toaster richColors position="top-right" duration={6000} />

          {/* AI assistant */}
          <AIAssistantBtn />
          <AIAssistant />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
