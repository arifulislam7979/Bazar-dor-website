import Image from "next/image";
import Link from "next/link";
import Dates from "./Dates";

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-[#f6f9f6] border border-gray-100 rounded-3xl p-6 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 shadow-sm">
        
        {/* বামপাশের কন্টেন্ট */}
        <div className="flex-1 space-y-4">
          {/* তারিখ ব্যাজ */}
          <div className="inline-block bg-[#d2fae4] text-[#029745] text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
            <Dates />
          </div>

          {/* প্রধান শিরোনাম */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* সাব-টাইটেল বর্ণনা */}
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বানিকে-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* কল-টু-অ্যাকশন বাটন */}
          <div className="pt-2">
            <Link
              href="#products"
              className="inline-block bg-[#009944] hover:bg-[#008039] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* ডানপাশের ব্যানার ইমেজ */}
        <div className="w-48 md:w-64 flex-shrink-0 flex justify-center">
          <Image
            src="/bazar-hero.png" // আপনার public ফোল্ডারের সঠিক ফাইল পাথ দিন
            alt="bazar hero img"
            width={260}
            height={260}
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default Header;