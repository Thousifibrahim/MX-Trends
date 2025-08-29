export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  ratingCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}
