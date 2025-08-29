import { useCart } from "@/hooks/useCart";
import { Link } from "wouter";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout process
    alert("This app is still in Development Phase!, I'm happy that you have checked out the features");
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center space-x-2 btn-glass px-4 py-2 rounded-lg mb-4" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold" data-testid="text-cart-title">Shopping Cart</h1>
          <p className="text-gray-400 text-lg">
            {items.length === 0 ? "Your cart is empty" : `${items.length} item${items.length !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4" data-testid="text-empty-cart">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <button className="bg-accent hover:bg-purple-600 px-8 py-3 rounded-xl font-semibold transition-colors" data-testid="button-start-shopping">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-6" data-testid={`cart-item-${item.productId}`}>
                  <div className="flex items-center space-x-6">
                    <Link href={`/products/${item.productId}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                        data-testid={`img-cart-item-${item.productId}`}
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-accent transition-colors cursor-pointer" data-testid={`text-cart-item-title-${item.productId}`}>
                          {item.product.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 capitalize" data-testid={`text-cart-item-category-${item.productId}`}>
                        {item.product.category}
                      </p>
                      <p className="text-accent font-semibold text-lg" data-testid={`text-cart-item-price-${item.productId}`}>
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="btn-glass w-10 h-10 rounded-lg flex items-center justify-center"
                          data-testid={`button-decrease-quantity-${item.productId}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold" data-testid={`text-cart-item-quantity-${item.productId}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="btn-glass w-10 h-10 rounded-lg flex items-center justify-center"
                          data-testid={`button-increase-quantity-${item.productId}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                        data-testid={`button-remove-item-${item.productId}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-lg" data-testid={`text-cart-item-subtotal-${item.productId}`}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div className="text-center pt-4">
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 transition-colors underline"
                  data-testid="button-clear-cart"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6" data-testid="text-order-summary">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span data-testid="text-subtotal">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-400" data-testid="text-shipping">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span data-testid="text-tax">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-accent" data-testid="text-total">
                        ${(getTotalPrice() * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-accent hover:bg-purple-600 py-3 rounded-xl font-semibold transition-colors"
                  data-testid="button-proceed-checkout"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">Secure checkout powered by SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
