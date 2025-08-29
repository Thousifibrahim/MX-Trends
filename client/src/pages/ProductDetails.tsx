import { useParams, Link } from "wouter";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";

export function ProductDetails() {
  const params = useParams();
  const productId = params.id || "";
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product);
      window.location.href = "/cart";
    }
  };

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Product</h2>
            <p className="text-gray-400">Failed to fetch product details. Please try again later.</p>
            <Link href="/">
              <button className="btn-glass px-6 py-3 rounded-xl font-semibold mt-4">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <button className="flex items-center space-x-2 btn-glass px-4 py-2 rounded-lg mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>
        </Link>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="w-full h-96 rounded-2xl" />
            </div>
            <div className="glass-card rounded-2xl p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-12 w-1/3 mb-6" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ) : product ? (
          <div className="grid md:grid-cols-2 gap-8" data-testid={`product-details-${product.id}`}>
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-2xl"
                data-testid="img-product-detail"
              />
            </div>
            <div>
              <div className="glass-card rounded-2xl p-6">
                <h1 className="text-3xl font-bold mb-4" data-testid="text-product-title">
                  {product.title}
                </h1>
                <p className="text-gray-400 mb-4 capitalize text-lg" data-testid="text-product-category">
                  {product.category}
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>

                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-accent mr-4" data-testid="text-product-price">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400" data-testid="text-product-rating">
                      ({product.rating}) • {product.ratingCount} reviews
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-glass py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 text-lg"
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-accent hover:bg-purple-600 py-4 rounded-xl font-semibold transition-colors text-lg"
                    data-testid="button-buy-now"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Product Not Found</h3>
            <p className="text-gray-400">The product you're looking for doesn't exist.</p>
            <Link href="/">
              <button className="btn-glass px-6 py-3 rounded-xl font-semibold mt-4">
                Back to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
