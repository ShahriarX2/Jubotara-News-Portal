import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header/Header";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { getMenus } from "@/lib/fetchData";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const solaimanLipi = localFont({
  src: "../public/fonts/SolaimanLipi.ttf",
  variable: "--font-solaiman-lipi",
  display: "swap",
});

const siteThemeMap = {
  jubotara: {
    primary: "#ee1d23",
    secondary: "#671a1b",
  },
  rpcNews: {
    primary: "#2e7d32",
    secondary: "#1b5e20",
  },
  default: {
    primary: "#0f172a",
    secondary: "#1d4ed8",
  },
};

const getSiteTheme = () => {
  const siteName = (
    process.env.SITE_NAME ||
    process.env.NEXT_PUBLIC_SITE_NAME ||
    process.env.FRONT_END_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    ""
  ).toLowerCase();

  const baseTheme = siteName.includes("jubotara")
    ? siteThemeMap.jubotara
    : siteName.includes("rpc") || siteName.includes("rpcnews")
      ? siteThemeMap.rpcNews
      : siteThemeMap.default;

  return {
    primary: process.env.NEXT_PUBLIC_THEME_PRIMARY || baseTheme.primary,
    secondary: process.env.NEXT_PUBLIC_THEME_SECONDARY || baseTheme.secondary,
  };
};

export const metadata = {
  title: "Jubotara News | সর্বশেষ সংবাদ ও ব্রেকিং নিউজ",
  description:
    "যুবতারা নিউজ বাংলাদেশের নির্ভরযোগ্য অনলাইন সংবাদমাধ্যম। সর্বশেষ জাতীয়, রাজনীতি, আন্তর্জাতিক, খেলাধুলা ও বিনোদনের খবর জানতে সঙ্গে থাকুন।",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default async function RootLayout({ children }) {
  const newsCategories = await getMenus();
  const theme = getSiteTheme();

  return (
    <html
      lang="bn"
      className={`${solaimanLipi.variable} font-sans`}
      style={{
        "--color-primary": theme.primary,
        "--color-secondary": theme.secondary,
      }}
    >
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2919469073787343"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-[#eff3f6] pb-16 md:pb-0">
        <Header />
        <ViewTransitions>{children}</ViewTransitions>
        <MobileBottomNav news_categories={newsCategories} />
        <Footer />
      </body>
    </html>
  );
}
