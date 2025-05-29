import { atom } from "nanostores";

export type Product = {
    productId: string;
    productName: string;
    productAmount: number;
    productPrice: string;
    productDescription: string;
};


export const counterPage = atom(1);
export const counterProductsToOrder = atom(0);
export const productIsOver = atom(false);
  
export const productList = atom<Product[]>([]);

export function loadProductsFromCookie() {
    try {
      const raw = document.cookie
        .split('; ')
        .find((row) => row.startsWith('reservedProducts='));
  
      if (!raw) return;
  
      const value = decodeURIComponent(raw.split('=')[1]);
      const parsed = JSON.parse(value);
  
      if (Array.isArray(parsed)) {
        productList.set(parsed);
      }
    } catch (e) {
      console.error('Error cargando productos desde cookie:', e);
    }
}