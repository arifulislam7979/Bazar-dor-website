"use client";

import { useState } from "react";
import { Product } from "@/app/components/Marquee";
import Link from "next/link";

const toBanglaNumber = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)] || digit)
    .join("");
};

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.today - b.today;
    } else if (sortBy === "price-high") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl">
          {products[0]?.categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
            {products[0]?.categoryNameBn}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Dynamic Sorting Control */}
      <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm flex items-center justify-end">
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
            সাজান
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#009944] cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Total Count Label */}
      <div>
        <p className="text-xs text-gray-500 font-medium">
          মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
              
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 hover:border-green-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                  {product.image}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    প্রতি{" "}
                    {product.unit === "kg"
                      ? "কেজি"
                      : product.unit === "litre"
                        ? "লিটার"
                        : product.unit === "dozen"
                          ? "ডজন"
                          : product.unit === "piece"
                            ? "পিস"
                            : product.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between pt-2">
                <div>
                  <p className="text-[11px] text-gray-400 font-medium mb-0.5">
                    আজকের দাম
                  </p>
                  <p className="text-xl font-extrabold text-gray-900">
                    {toBanglaNumber(product.today.toLocaleString("en-US"))}{" "}
                    <span className="text-sm font-normal text-gray-700">
                      টাকা
                    </span>
                  </p>
                </div>

                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                    isUp
                      ? "bg-red-50 text-red-600"
                      : isDown
                        ? "bg-emerald-50 text-[#009944]"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                  <span>{toBanglaNumber(product.change.pct.toFixed(1))}%</span>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
