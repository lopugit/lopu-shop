export function trackAddToCart(dataLayer: any, ShopifyAnalytics: any, product: any, variant: any, quantity: number): void {
  dataLayer.push({
    event: "addToCart",
    ecommerce: {
      currencyCode: ShopifyAnalytics.meta.currency,
      add: {
        products: [
          {
            name: product.title.replace("'", ""),
            id: variant.sku,
            price: variant.price / 100,
            brand: product.vendor,
            variant: variant && variant.title && variant.title.replace("'", ""),
            quantity
          }
        ]
      }
    }
  });
}

export function trackRemoveFromCart(dataLayer: any, lineitem: any): void {
  dataLayer.push({
    event: "removeFromCart",
    ecommerce: {
      remove: {
        products: [
          {
            id: lineitem.sku,
            name: lineitem.product_title,
            quantity: lineitem.quantity,
            price: lineitem.price / 100,
            brand: lineitem.vendor,
            variant: lineitem.variant_title
          }
        ]
      }
    }
  });
}

type ProductConfig = {
  name: string;
  id: string;
  price?: string;
  brand?: string;
  category?: string;
  variant?: string;
  position?: number;
}

export const trackProductClick = (products: Array<ProductConfig>, url: string, list?: string) => {
  window.dataLayer.push({
    event: "productClick",
    ecommerce: {
      click: {
        actionField: {
          list,
        },
        products
      }
    },
    eventCallback: () => {
      window.location.href = url;
    }
  })
}

type PromoConfig = {
  id: string;
  name: string;
  creative?: string;
  position?: string;
}

export const trackPromotionClick = (promotions: Array<PromoConfig>, url) => {
  window.dataLayer.push({
    event: "promotionClick",
    ecommerce: {
      promoClick: {
        promotions
      }
    },
    eventCallback: () => {
      window.location.href = url;
    }
  })
}