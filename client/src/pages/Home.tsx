import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { Laptop, Shirt, Gem, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

export function Home() {
  const { data: products, isLoading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProducts = products?.slice(0, 4) || [];

  const categories = [
    {
      name: "Electronics",
      href: "/electronics",
      icon: Laptop,
      count: "120+ Products",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      name: "Clothing",
      href: "/clothes",
      icon: Shirt,
      count: "200+ Items",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Jewelry",
      href: "/jewelery",
      icon: Gem,
      count: "80+ Pieces",
      gradient: "from-green-500 to-cyan-500",
    },
    {
      name: "Bags",
      href: "/bags",
      icon: ShoppingBag,
      count: "95+ Styles",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Products</h2>
            <p className="text-gray-400">Failed to fetch products from the store. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-8 lg:p-12 hero-gradient">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent cyber-glow">
                MX Trends
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover premium products with modern design. Shop electronics, fashion, jewelry, We ship across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-glass px-8 py-3 rounded-xl font-semibold text-white holographic font-mono" data-testid="button-explore">
                  {'>>'} SCAN_AND_SEARCH
                </button>
                <Link href="/electronics">
                  <button className="btn-glass px-8 py-3 rounded-xl font-semibold text-white matrix-rain font-mono" data-testid="button-shop-categories">
                    {'>>'} ACCESS_ELECTRONIC
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16" data-testid="section-featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 cyber-glow font-mono">SHOP  NOW </h2>
            <p className="text-gray-400 text-lg font-mono">NEW STOCK AVAILABLE TILL DECEMBER</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[...Array(4)].map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 cyber-glow">What we offer you. </h2>
            <p className="text-gray-400 text-lg">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="glass-card rounded-2xl p-6 text-center product-card group"
                  data-testid={`link-category-${category.name.toLowerCase()}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
