import type { Metadata } from "next";
import { Hind_Siliguri} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const HindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", 'bengali'],
});


export const metadata: Metadata = {
  title: "বাজার দর — এক নজরে আজকের বাজারের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার নিত্যদিনের সঠিক বাজার দর ও দামের তুলনা দেখুন এক জায়গায়।",
  icons:{
    icon: '/logo-icon.png',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${HindSiliguri.className} h-full antialiased`}
    >
      <body className=" min-h-full flex flex-col">
        <Navbar></Navbar>
        <Marquee></Marquee>
        {children}
        <Footer></Footer>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
