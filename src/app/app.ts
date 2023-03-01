import * as sections from "./view/section";
import * as templates from "./view/template";
import { ShopifyNext } from "@dotdev/next-components";

export function loader() {
  const app = new ShopifyNext({
    //sections: Object.values(sections),
    sections: Object.keys(sections).map((item) => sections[item]),
    templates: {
      notFound: templates.NotFoundTemplate,
      account: {
        details: templates.AccountTemplate,
        addresses: templates.AccountTemplate,
        login: templates.AccountLoginTemplate,
        logout: templates.AccountLogoutTemplate,
        order: templates.AccountTemplate,
        register: templates.AccountRegisterTemplate,
        reset: templates.AccountResetTemplate,
        activate: templates.AccountActivateTemplate
      },
      article: templates.ArticleTemplate,
      blog: templates.BlogTemplate,
      cart: templates.CartTemplate,
      checkout: templates.CheckoutTemplate,
      collection: templates.CollectionTemplate,
      collections: templates.NotFoundTemplate,
      giftcard: templates.GiftCardTemplate,
      wishlist: templates.WishlistTemplate,
      home: templates.HomeTemplate,
      page: templates.PageTemplate,
      password: templates.PasswordTemplate,
      product: templates.ProductTemplate,
      search: templates.SearchTemplate,
      challenge: templates.ChallengeTemplate,
      policy: templates.PolicyTemplate
    },
    notifications: {
      MESSAGE_TIMEOUT: 5000,
      CART_ITEM_ADDED_SUCCESS: "Item added to cart",
      CART_ITEM_ADDED_QTY_NOT_AVAILABLE: "Item quantity not available",
      CART_ITEM_ADDED_FAILED: "Error adding item to cart",
      CART_ITEM_REMOVED_SUCCESS: "Item removed from cart",
      CART_ITEM_REMOVED_FAILED: "Error removing item from cart",
      CART_PROPERTIES_UPDATE_SUCCESS: "Successfully updated properties",
      CART_PROPERTIES_UPDATE_FAILED: "Failed to update properties",
      CART_QTY_UPDATE_SUCCESS: "Item quantity updated",
      CART_QTY_UPDATE_FAILED: "Error updating item quantity",
      CART_VARIANT_UPDATE_SUCCESS: "Item variant updated",
      CART_VARIANT_UPDATE_FAILED: "Error updating variant",
      CART_REQUEST_FAILED: "Error requesting cart",
      CART_CLEARED_SUCCESS: "Cart has been cleared",
      CART_CLEARED_FAILED: "Error clearing cart",
      CART_NOTE_UPDATE_SUCCESS: "Cart note updated",
      SHIPPING_RATES_SUCCESS: "Shipping rates returned",
      SHIPPING_RATES_FAILED: "Error returing shipping rates",
      PRODUCT_RECOMMENDATIONS_SUCCESS: "Product recommmendations returned",
      PRODUCT_RECOMMENDATIONS_NOTFOUND: "No product recommmendations found",
      PRODUCT_RECOMMENDATIONS_FAILED: "Error returing product recommmendations",
      WISHLIST_REQUEST_SUCCESS: "Wishlist returned",
      WISHLIST_REQUEST_FAILED: "Error requesting wishlist",
      WISHLIST_ITEM_ADDED_SUCCESS: "Item added to wishlist",
      WISHLIST_ITEM_ADDED_FAILED: "Error adding item to wishlist",
      WISHLIST_ITEM_REMOVED_SUCCESS: "Item removed from wishlist",
      WISHLIST_ITEM_REMOVED_FAILED: "Error removing item from wishlist",
      WISHLIST_ITEM_UPDATED_SUCCESS: "Item variant updated",
      WISHLIST_ITEM_UPDATED_FAILED: "Error updating variant",
      WISHLIST_SHARED_SUCCESS: "Wishlist shared",
      WISHLIST_SHARED_FAILED: "Error sharing wishlist",
      WISHLIST_DUPLICATE_SUCCESS: "Wishlist duplicated",
      WISHLIST_DUPLICATE_FAILED: "Error duplicating wishlist",
      WISHLIST_MIGRATE_SUCCESS: "Wishlist migrated",
      WISHLIST_MIGRATE_FAILED: "Error migrating wishlist",
      HELPERS_PRODUCTS_SUCCESS: "",
      HELPERS_PRODUCTS_FAILED: "",
      HELPERS_GIFTCARD_SUCCESS: "",
      HELPERS_GIFTCARD_FAILED: "",
      HELPERS_CUSTOMER_SUCCESS: "",
      HELPERS_CUSTOMER_FAILED: ""
    }
  });

  app.bootstrap("root", window);
}
