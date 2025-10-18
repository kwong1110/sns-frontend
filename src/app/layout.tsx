import { ReactQueryProvider } from "@/app/_providers/react-query";
import { Sidebar } from "@/widgets/sidebar";
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
  title: "홈 • Sns App",
  description: "Sns App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen bg-background">
          <Sidebar />

          <div className="flex flex-1 justify-center md:ml-19">
            <main className="w-full lg:max-w-[640px] border-x border-border pb-16 md:pb-0 bg-primary-foreground">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
