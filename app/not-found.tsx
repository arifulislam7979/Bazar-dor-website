import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center gap-5">
        {/* Big 404 Badge with Icon */}
        <div className="w-20 h-20 bg-emerald-50 text-[#009944] rounded-2xl flex items-center justify-center text-4xl font-black shadow-inner">
          <FaSearch className="animate-bounce text-3xl" />
        </div>

        {/* 404 Number */}
        <div className="space-y-1">
          <h1 className="text-6xl font-black text-[#009944] tracking-wider">
            ৪০৪
          </h1>
          <h2 className="text-xl font-extrabold text-gray-900">
            পৃষ্ঠাটি পাওয়া যায়নি!
          </h2>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
          আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা ইউআরএল (URL) ভুল
          লেখা হয়েছে।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="w-full bg-[#009944] hover:bg-[#008039] text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
        >
          <FaHome className="text-base" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Footer Branding */}
      <p className="text-xs text-gray-400 font-medium mt-6">
        বাজার দর — বাজারের বিশ্বস্ত তথ্য
      </p>
    </div>
  );
};

export default NotFoundPage;
