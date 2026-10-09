import { use, Suspense } from "react";
import { Product } from "@/app/components/Marquee";
import CategoryProducts from "@/app/components/CategoryProduct";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

async function CategoryContent({ categorySlug }: { categorySlug: string }) {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categorySlug}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">
        পণ্যটি পাওয়া যায়নি।
      </div>
    );
  }
  const products: Product[] = await res.json();

  return <CategoryProducts products={products} />;
}

function CategoryWrapper({ params }: CategoryPageProps) {
  const { categorySlug } = use(params);
  return <CategoryContent categorySlug={categorySlug} />;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="w-full min-h-screen py-6">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 text-center py-10 text-gray-500">
            লোড হচ্ছে...
          </div>
        }
      >
        <CategoryWrapper params={params} />
      </Suspense>
    </div>
  );
}
