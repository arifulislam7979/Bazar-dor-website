import { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/app/components/Marquee";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

const toBanglaNumber = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)] || digit)
    .join("");
};

async function ProductDetailsContent({ params }: ProductDetailsProps) {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    notFound();
  }

  const product: Product = await res.json();
  if (!product || !product.id) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const priceDiff = Math.abs(product.today - product.yesterday);

  const marketPrices = product.markets?.map((m) => (m.min + m.max) / 2);

  const minPrice = marketPrices.length
    ? Math.min(...product.markets.map((m) => m.min))
    : product.today;
  const maxPrice = marketPrices.length
    ? Math.max(...product.markets.map((m) => m.max))
    : product.today;
  const avgPrice = marketPrices.length
    ? Math.round(marketPrices.reduce((a, b) => a + b, 0) / marketPrices.length)
    : product.today;

  const unitText =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "litre"
        ? "লিটার"
        : product.unit === "dozen"
          ? "ডজন"
          : product.unit === "piece"
            ? "পিস"
            : product.unit;

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-gray-900 transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-semibold">{product.nameBn}</span>
      </nav>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              প্রতি {unitText} · {product.categoryNameBn}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-2">
              গতকালকের তুলনায় আজ দাম
              <span className="font-bold text-gray-800">
                {isUp ? " বেড়েছে" : isDown ? " কমেছে" : "একই আছে"}
              </span>
              · {toBanglaNumber(priceDiff)} টাকা
            </p>
          </div>
        </div>

        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 min-w-[140px] text-center self-stretch md:self-auto flex flex-col justify-center">
          <p className="text-[11px] text-gray-400 font-semibold mb-1">
            আজকের দাম
          </p>
          <p className="text-3xl font-black text-gray-900 leading-none mb-1">
            {toBanglaNumber(product.today)}
          </p>
          <p className="text-xs text-gray-500 font-medium mb-1">
            টাকা / {unitText}
          </p>
          <div
            className={`inline-flex items-center justify-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
              isUp
                ? "text-red-600 bg-red-50"
                : isDown
                  ? "text-[#009944] bg-emerald-50"
                  : "text-gray-500 bg-gray-100"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{toBanglaNumber(product.change?.pct?.toFixed(1))}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
            <p className="text-xl font-extrabold text-[#009944]">
              {toBanglaNumber(minPrice)} টাকা
            </p>
            <p className="text-[11px] text-gray-400 font-medium">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</p>
            <p className="text-xl font-extrabold text-red-500">
              {toBanglaNumber(maxPrice)} টাকা
            </p>
            <p className="text-[11px] text-gray-400 font-medium">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
            <p className="text-xl font-extrabold text-gray-800">
              {toBanglaNumber(avgPrice)} টাকা
            </p>
            <p className="text-[11px] text-gray-400 font-medium">
              প্রতি {unitText}-এর হিসাব
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto border rounded-2xl pt-4">
          <table className="w-full text-left text-xs md:text-sm ">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-semibold pl-4">বাজার</th>
                <th className="pb-3 font-semibold">বিভাগ</th>
                <th className="pb-3 font-semibold text-center">সর্বনিম্ন</th>
                <th className="pb-3 font-semibold text-center">সর্বাধিক</th>
                <th className="pb-3 font-semibold text-right pr-4">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6F7771]">
              {product.markets?.map((m, idx) => {
                const marketAvg = ((m.min + m.max) / 2).toFixed(2);
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors  ${
                      isEven ? "bg-white" : "bg-[#F0F5F0]"
                    }`}
                  >
                    <td className="py-3.5 pl-4 font-bold text-gray-800">
                      {m.market}
                    </td>
                    <td className="py-3.5 text-gray-600 font-medium">
                      {m.division}
                    </td>
                    <td className="py-3.5 text-center font-bold text-gray-700">
                      {toBanglaNumber(m.min)} টাকা
                    </td>
                    <td className="py-3.5 text-center font-bold text-gray-700">
                      {toBanglaNumber(m.max)} টাকা
                    </td>
                    <td className="py-3.5 pr-4 text-right font-extrabold text-gray-900">
                      {toBanglaNumber(
                        marketAvg.endsWith(".00")
                          ? Math.round(Number(marketAvg))
                          : marketAvg,
                      )}{' '}
                      টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  return (
    <div className="w-full min-h-screen py-6 bg-[#f7f8f6]">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 text-center py-12 text-gray-500 font-medium">
            লোড হচ্ছে...
          </div>
        }
      >
        <ProductDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
