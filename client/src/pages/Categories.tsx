import { useParams } from "wouter";
import { useProductsByCategory } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const categoryMap: Record<string, string> = {
  bags: "men's clothing", // Fake Store API doesn't have bags, using men's clothing as substitute
  clothes: "women's clothing", // Use women's clothing for clothes category
  electronics: "electronics",
  jewelry: "jewelery", // Note: Fake Store API uses "jewelery" spelling
};

const categoryDisplayNames: Record<string, string> = {
  bags: "Bags & Accessories",
  clothes: "Clothing",
  electronics: "Electronics",
  jewelry: "Jewelry",
};

export function Categories() {
  const params = useParams();
  const category = params.category || "";
  
  // Handle special category mapping
  let apiCategory = categoryMap[category];
  if (category === "bags") {
    apiCategory = "bags"; // Use special handling in useProductsByCategory
  }
  
  const displayName = categoryDisplayNames[category] || category;

  const { data: products, isLoading, error } = useProductsByCategory(apiCategory);

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Products</h2>
            <p className="text-gray-400">Failed to fetch products for this category. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 capitalize" data-testid={`text-category-title-${category}`}>
            {displayName}
          </h1>
          <p className="text-gray-400 text-lg">
            {isLoading ? "Loading products..." : `${products?.length || 0} products available`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <Skeleton className="w-full h-48 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid={`grid-products-${category}`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">No Products Found</h3>
            <p className="text-gray-400">No products available in this category at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
