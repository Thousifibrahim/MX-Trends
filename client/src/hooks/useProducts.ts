import { useQuery } from "@tanstack/react-query";
import { FakeStoreProduct, Product } from "@/types/product";
import { additionalMockData } from "@/lib/mockData";

const FAKE_STORE_API = "https://fakestoreapi.com/products";

function transformProduct(fakeProduct: FakeStoreProduct): Product {
  return {
    id: fakeProduct.id.toString(),
    title: fakeProduct.title,
    price: fakeProduct.price,
    description: fakeProduct.description,
    category: fakeProduct.category,
    image: fakeProduct.image,
    rating: fakeProduct.rating.rate,
    ratingCount: fakeProduct.rating.count,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: [FAKE_STORE_API],
    queryFn: async (): Promise<Product[]> => {
      try {
        const response = await fetch(FAKE_STORE_API);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const apiData: FakeStoreProduct[] = await response.json();
        const transformedApiData = apiData.map(transformProduct);
        
        // Add all our mock data for a more complete product catalog
        const allMockData = [
          ...additionalMockData.clothes,
          ...additionalMockData.bags
        ];
        
        return [...transformedApiData, ...allMockData];
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [FAKE_STORE_API, id],
    queryFn: async (): Promise<Product> => {
      const response = await fetch(`${FAKE_STORE_API}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data: FakeStoreProduct = await response.json();
      return transformProduct(data);
    },
    enabled: !!id,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: [FAKE_STORE_API, 'category', category],
    queryFn: async (): Promise<Product[]> => {
      try {
        // For bags, combine men's clothing API data with our mock bag data
        if (category === "bags") {
          const response = await fetch(`${FAKE_STORE_API}/category/men's clothing`);
          if (!response.ok) {
            throw new Error('Failed to fetch products by category');
          }
          const apiData: FakeStoreProduct[] = await response.json();
          const transformedApiData = apiData.map(transformProduct).slice(0, 2); // Limit API data
          
          // Add mock bag data
          const mockBags = additionalMockData.bags || [];
          return [...transformedApiData, ...mockBags];
        }
        
        // For all other categories, use API as normal
        const response = await fetch(`${FAKE_STORE_API}/category/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products by category');
        }
        const data: FakeStoreProduct[] = await response.json();
        return data.map(transformProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    enabled: !!category,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [FAKE_STORE_API, 'categories'],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch(`${FAKE_STORE_API}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    },
  });
}
