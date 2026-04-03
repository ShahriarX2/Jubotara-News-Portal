import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header/Header";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { getMenus } from "@/lib/fetchData";
import localFont from "next/font/local";
import "./globals.css";

const solaimanLipi = localFont({
  src: "../public/fonts/SolaimanLipi.ttf",
  variable: "--font-solaiman-lipi",
  display: "swap",
});

export const metadata = {
  title: "Jubotara News | সর্বশেষ সংবাদ ও ব্রেকিং নিউজ",
  description:
    "যুবতারা নিউজ বাংলাদেশের নির্ভরযোগ্য অনলাইন সংবাদমাধ্যম। সর্বশেষ জাতীয়, রাজনীতি, আন্তর্জাতিক, খেলাধুলা ও বিনোদনের খবর জানতে সঙ্গে থাকুন।",
};

export default async function RootLayout({ children }) {
  const newsCategories = await getMenus();

  return (
    <html lang="bn" className={`${solaimanLipi.variable} font-sans`}>
      <body className="bg-[#eff3f6] pb-16 md:pb-0">
        <Header />
        {children}
        <MobileBottomNav news_categories={newsCategories} />
        <Footer />
      </body>
    </html>
  );
}
