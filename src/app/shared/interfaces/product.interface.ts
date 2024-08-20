export interface Product {
  id: string;
  title: string;
}

export type CreateProduct = Omit<Product, 'id'>;
