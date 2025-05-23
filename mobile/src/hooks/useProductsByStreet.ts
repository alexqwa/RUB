import { useEffect, useState } from 'react';

import { api } from '../lib/axios';

interface Product {
  id: number;
  code: number;
  title: string;
  stock: number;
}

export function useProductsByStreet(code: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getProductsByStreet() {
      try {
        const response = await api.get<Product[]>(`/streets/${code}/products`);
        const updatedProducts = response.data
          .filter((product) => product.stock > 0)
          .map((product) => ({
            ...product,
            stock: product.stock,
          }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    getProductsByStreet();
  }, [products, code]);

  return { products, loading };
}
