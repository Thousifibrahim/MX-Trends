import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Store, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartSidebar } from "./CartSidebar";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const { toggleCart, getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = getTotalItems();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Clothes", href: "/clothes" },
    { name: "Electronics", href: "/electronics" },
    { name: "Jewelry", href: "/jewelery" },
    { name: "Bags", href: "/bags" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Store className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cyber-glow">
                MXT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-item px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location === item.href ? "bg-white bg-opacity-10" : ""
                  }`}
                  data-testid={`link-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-lg nav-item transition-all duration-200"
                data-testid="button-cart"
              >
                <ShoppingCart className="text-lg" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                href="/profile"
                className="p-2 rounded-lg nav-item transition-all duration-200"
                data-testid="link-profile"
              >
                <User className="text-lg" />
              </Link>
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg nav-item"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="text-lg" /> : <Menu className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-item px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location === item.href ? "bg-white bg-opacity-10" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <Store className="text-white text-sm" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cyber-glow">
                    MX Trends
                  </span>
                </div>
                <p className="text-gray-400">Premium e-commerce experience with modern design and seamless shopping.</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                  <li><Link href="/clothes" className="hover:text-white transition-colors">Clothing</Link></li>
                  <li><Link href="/jewelry" className="hover:text-white transition-colors">Jewelry</Link></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="btn-glass p-3 rounded-lg hover:scale-110 transition-transform">
                    <span>FB</span>
                  </a>
                  <a href="#" className="btn-glass p-3 rounded-lg hover:scale-110 transition-transform">
                    <span>TW</span>
                  </a>
                  <a href="#" className="btn-glass p-3 rounded-lg hover:scale-110 transition-transform">
                    <span>IG</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>Designed and Developed by Smdspace</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
}
