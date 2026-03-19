import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qlchitieu.app';
const SITE_NAME = 'QLChiTieu';
const SITE_DESCRIPTION = 'Quản lý chi tiêu cá nhân thông minh — ghi chép thu chi, lập ngân sách, đặt mục tiêu tiết kiệm và phân tích hành vi tài chính.';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Quản Lý Chi Tiêu Cá Nhân`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'quản lý chi tiêu', 'theo dõi thu chi', 'ngân sách cá nhân',
    'tiết kiệm', 'tài chính cá nhân', 'ghi chép chi tiêu',
    'mục tiêu tiết kiệm', 'phân tích chi tiêu', 'QLChiTieu',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'finance',
  applicationName: SITE_NAME,
  generator: 'Next.js',
  robots: {
    index: false, // personal finance app — không index
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Quản Lý Chi Tiêu Cá Nhân`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
