import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Link } from "wouter";

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 glass-nav transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-testid="sidebar-cart"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold" data-testid="text-cart-title">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="btn-glass p-2 rounded-lg"
            data-testid="button-close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400" data-testid="text-empty-cart">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="glass-card rounded-xl p-4" data-testid={`cart-item-${item.productId}`}>
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    data-testid={`img-cart-${item.productId}`}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2" data-testid={`text-cart-title-${item.productId}`}>
                      {item.product.title}
                    </h4>
                    <p className="text-gray-400 text-sm" data-testid={`text-cart-price-${item.productId}`}>
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      data-testid={`button-remove-${item.productId}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="btn-glass w-8 h-8 rounded-lg flex items-center justify-center"
                        data-testid={`button-decrease-${item.productId}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center" data-testid={`text-quantity-${item.productId}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="btn-glass w-8 h-8 rounded-lg flex items-center justify-center"
                        data-testid={`button-increase-${item.productId}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-700 pt-6 mt-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-xl text-accent" data-testid="text-cart-total">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Link href="/cart">
              <button
                onClick={closeCart}
                className="w-full bg-accent hover:bg-purple-600 py-3 rounded-xl font-semibold transition-colors"
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
