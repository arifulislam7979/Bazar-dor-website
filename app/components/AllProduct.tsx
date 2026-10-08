import Link from "next/link";
import { Product } from "./Marquee";


const toBanglaNumber = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)] || digit)
    .join("");
};

const AllProduct = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } }
  );
  
  const allProduct: Product[] = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          সব পণ্য
        </h2>
        <p className="text-xs text-gray-500 font-medium mt-1">
          মোট {toBanglaNumber(allProduct.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div id={'products'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allProduct.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
              
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 hover:border-green-500"
            >

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl ">
                  {product.image}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : product.unit === 'piece' ? 'পিস' : product.unit}
                  </p>
                </div>
              </div>

              
              <div className="flex items-end justify-between pt-2">
                <div>
                  <p className="text-[11px] text-gray-400 font-medium mb-0.5">
                    আজকের দাম
                  </p>
                  <p className="text-xl font-extrabold text-gray-900">
                    {toBanglaNumber(product.today.toLocaleString("en-US"))}
                    <span className="text-sm font-normal text-gray-700">টাকা</span>
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
};

export default AllProduct;