"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "./Navbar";

interface NavLinkProps {
  data: Category[];
}

const NavLink = ({ data }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100 pt-3 flex items-center justify-start gap-2 overflow-x-auto no-scrollbar">
      {data?.map((d) => {
        const targetPath = `/category/${d.id}`;
        const isActive = pathname === targetPath;

        return (
          <Link
            key={d.id}
            href={targetPath}
            className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              isActive
                ? "bg-[#009944] text-white"
                : "text-gray-800 hover:text-[#009944] hover:bg-green-50"
            }`}
          >
            <span>{d.icon}</span>
            <span>{d.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLink;