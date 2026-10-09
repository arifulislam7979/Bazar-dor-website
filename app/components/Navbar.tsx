import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import Dates from "./Dates";
import { Suspense } from "react";
import { Product } from "./Marquee";
import UsserInfo from "./UsserInfo";

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    }
  );

  const data: Product[] = await res.json();


  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center justify-between pb-3 gap-2">
          {/* Logo & Dates */}
          <Link href={"/"}>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#009944] rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden p-1.5 sm:p-2">
                <Image
                  src="/logo-icon.png"
                  alt="logo img"
                  height={40}
                  width={40}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  বাজার দর
                </h2>
                <Dates />
              </div>
            </div>
          </Link>

          <UsserInfo></UsserInfo>
        </div>

        <Suspense
          fallback={
            <div className="h-10 bg-gray-50 animate-pulse rounded-lg" />
          }
        >
          <NavLink data={data} />
        </Suspense>
      </div>
    </header>
  );
};

export default Navbar;