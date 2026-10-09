"use client";

import { authClient, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent, } from "@heroui/react";
import { FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <div>
      {user ? (
        <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger>
            <button className="flex items-center gap-2 outline-none cursor-pointer py-1.5 px-3 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-all border border-gray-200/60">
              {user?.image ? (
                <Image
                  src={user?.image}
                  alt={user?.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#009944] text-white font-bold text-xs flex items-center justify-center">
                  {user?.name?.charAt(0)}
                </div>
              )}
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                {user?.name}
              </span>
              <FaChevronDown className="text-[10px] text-gray-500" />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-56 p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col gap-3 w-full text-left">
              <div className="border-b border-gray-100 pb-2.5">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {user?.name}
                </h2>
                <p className="text-[11px] text-gray-400 font-normal truncate mt-0.5">
                  {user?.email}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/profile");
                  }}
                  className="flex items-center gap-2.5 px-2 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors w-full text-left cursor-pointer"
                >
                  <FaUser className="text-gray-500 text-xs" />
                  <span>আমার প্রোফাইল</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-2.5 px-2 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full text-left cursor-pointer"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/signin"
            className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-gray-900 px-2 sm:px-3 py-1.5 sm:py-2 transition-colors whitespace-nowrap"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="bg-[#009944] hover:bg-[#008039] text-white text-xs sm:text-sm font-medium px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all shadow-sm sm:shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
