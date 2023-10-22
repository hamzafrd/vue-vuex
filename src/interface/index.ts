export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image_title: string;
  image: string;
}

export interface Products {
  products: Product[];
}

export interface Cart {
  product: Product;
  qty: number;
}
