import { Product } from "./components/Marquee";

const toBanglaNumber = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)] || digit)
    .join("");
};

const PriceDown = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } },
  );
  const productData: Product[] = await res.json();

  const filteredData = productData.filter(
    (product) => product.change.dir === "down",
  );
  
  const downProduct = filteredData.sort(
    (a, b) => a.change.pct - b.change.pct,
  );
  console.log(downProduct);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#009944] text-sm">▼</span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          আজ দাম কমেছে
        </h2>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {downProduct.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
          >
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {product.image}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base leading-snug">
                  {product.nameBn}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
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
                  <span className="text-sm font-normal text-gray-700">টাকা</span>
                </p>
              </div>

              
              <div className="bg-emerald-50 text-[#009944] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <span>▼</span>
                <span>{toBanglaNumber(product.change.pct)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceDown;