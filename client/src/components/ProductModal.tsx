import { X, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem(product);
    onClose();
    // Navigate to cart/checkout
    window.location.href = "/cart";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="modal-product"
    >
      <div
        className="glass-effect rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" data-testid="text-modal-title">Product Details</h2>
            <button
              onClick={onClose}
              className="btn-glass p-2 rounded-lg"
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-2xl"
                data-testid="img-modal-product"
              />
            </div>
            <div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4" data-testid="text-modal-product-title">
                  {product.title}
                </h3>
                <p className="text-gray-400 mb-4 capitalize" data-testid="text-modal-category">
                  {product.category}
                </p>
                <p className="text-gray-300 mb-6" data-testid="text-modal-description">
                  {product.description}
                </p>

                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-accent mr-4" data-testid="text-modal-price">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                      />
                    ))}
                    <span className="text-gray-400 ml-2" data-testid="text-modal-rating">
                      ({product.rating})
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-glass py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                    data-testid="button-modal-add-cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-accent hover:bg-purple-600 py-3 rounded-xl font-semibold transition-colors"
                    data-testid="button-modal-buy-now"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
