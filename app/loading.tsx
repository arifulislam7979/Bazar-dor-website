import { FaShoppingBasket } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Icon Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulse Effect */}
          <div className="absolute w-20 h-20 bg-[#009944]/20 rounded-full animate-ping" />

          {/* Icon Box */}
          <div className="relative w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-[#009944] text-2xl">
            <FaShoppingBasket className="animate-bounce" />
          </div>
        </div>

        {/* Text and Spinner */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-base font-bold text-gray-800">
            বাজার দর লোড হচ্ছে...
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন
          </p>
        </div>

        {/* Loading Spinner Dots */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-2 h-2 bg-[#009944] rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-[#009944] rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-[#009944] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
