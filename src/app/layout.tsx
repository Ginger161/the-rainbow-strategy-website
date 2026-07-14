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
  title: "The Rainbow Strategy | Public Affairs & Data Protection",
  description: "Strategic Intelligence for Public Affairs, Strategic Communication & Data Protection Compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
        {/* Global Ambient Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 mix-blend-overlay opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          ></div>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-slate-400/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Page Content */}
        <div className="relative z-10 flex flex-col flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
