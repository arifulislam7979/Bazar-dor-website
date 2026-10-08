import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import Dates from "./Dates";
export const dynamic = "force-dynamic";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    },
  );

  const data: Category[] = await res.json();

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center justify-between pb-3">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#009944] rounded-2xl flex items-center justify-center overflow-hidden p-2">
                <Image
                  src="/logo-icon.png"
                  alt="logo img"
                  height={40}
                  width={40}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  বাজার দর
                </h2>
                <Dates></Dates>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-semibold text-gray-800 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="bg-[#009944] hover:bg-[#008039] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <NavLink data={data}></NavLink>
      </div>
    </header>
  );
};

export default Navbar;
