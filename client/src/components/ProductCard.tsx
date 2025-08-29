import { Plus, Star } from "lucide-react";
import { Link } from "wouter";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="glass-card rounded-2xl p-6 product-card cursor-pointer" data-testid={`card-product-${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
          data-testid={`img-product-${product.id}`}
        />
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-title-${product.id}`}>
          {product.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 capitalize" data-testid={`text-category-${product.id}`}>
          {product.category}
        </p>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm">({product.ratingCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent" data-testid={`text-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-glass px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
            data-testid={`button-add-${product.id}`}
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
