import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const toBanglaNumber = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)] || digit)
    .join("");
};

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: "up" | "down";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } },
  );
  const data: Product[] = await res.json();

  return (
    <div className=" bg-gray-50 py-2 border-y border-gray-100">
      <MarqueeText
        className="max-w-7xl mx-auto px-4 flex items-center gap-8"
        direction="right"
        duration={10}
      >
        {data.map((d) => {
          const isUp = d.change.dir === "up";
          return (
            <div
              key={d.id}
              className="flex items-center gap-2 mx-4 text-sm font-medium text-gray-800 whitespace-nowrap"
            >
              
                <span>{d.image}</span>
                <span className="font-bold">{d.nameBn}</span>
                <span>
                  {toBanglaNumber(d.today)} টাকা/
                  {d.unit === "kg" ? "কেজি" : d.unit}
                </span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    isUp ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {toBanglaNumber(d.change.pct)}%
                </span>
              
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
