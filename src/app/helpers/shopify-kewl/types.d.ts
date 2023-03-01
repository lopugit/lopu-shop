
export interface Config {
  store: string;
  graphPath?: string;
  storeFrontKey: string;
}

export interface Product {
  id?: string | undefined;
  handle?: string | undefined;
  title?: string | undefined;
  images?: string[];
  variants?: {
    id: string;
    image: string;
    price: number;
    title: string;
  }[];
  description?: string | undefined | null;
  price_min?: number | undefined | null;
  tags?: string | undefined | null
}

export interface GraphQlProduct extends ProductNode {
  node: ProductNode;
}
export interface ProductNode {
  id?: string;
  handle?: string;
  description?: string;
  title?: string;
  price?: string;
  tags?: string;
  priceRange?: {
    maxVariantPrice?: {
      amount: string;
    }
    minVariantPrice?: {
      amount: string;
    }
  };
  images?: {
    edges: {
      node: {
        src: string;
      }
    }[];
  } | undefined;
  variants?: {
    edges: GraphQlProductVariants[];
  };
}
export interface GraphQlProductVariants {
  node: {
    id: number;
    price: string;
    title: string;
    compareAtPrice: number
    image: {
      src: string;
    };
  };
}
export interface Shop {
  name: string;
}
