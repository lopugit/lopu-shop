import { ShopifyNext } from "@dotdev/next-components";
import * as Sections from "sections";
import * as Templates from "templates";
import { Tracing } from "trace_events";

/*
  @GlobalData {
    { global sections },
    { global settings }
  }
*/

export interface FormAttributes {
  id: string;
  action: string;
  method: string;
  accept_charset?: string;
  enctype?: string;
  class?: string;
}
export interface FormField {
  name: string;
  type: string;
  value: string;
}

export interface Form {
  errors?: string[];
  fields?: Array<FormField>;
  form?: FormAttributes;
  password_needed: boolean;
  posted_successfully: boolean;
}

export interface Article {
  type: string;
  id: number;
  handle: string;
  url: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  excerpt_or_content: string;
  image: {
    id: number;
    src: string;
    alt: string;
    height: number;
    width: number;
    aspect_ratio: number;
    position: number;
  };
  tags: string[];
  created_at: string;
  published_at: string;
  comments_count: number;
  comments_enabled: boolean;
  comment_post_url: string;
  moderated: boolean;
  user: null;
  metafields: any;
  template_suffix: string;
}

export interface PaginationPart {
  is_link: boolean | null;
  url: string;
  title: string;
}

export interface Pagination {
  current_page: number;
  current_offset: number;
  items: number;
  parts: PaginationPart[];
  next: null;
  previous: null;
  page_size: number;
  pages: number;

}

export interface GlobalData
  extends ShopifyNext.Data<
  {
    announcement: Sections.Announcement.Options;
    header: Sections.Header.Options;
    footer: Sections.Footer.Options;
    subscribe: Sections.Subscribe.Options;
    usp: Sections.USP.Options;
    instagram: Sections.Instagram.Options;
    geo: Sections.PopupGeoRedirecion.Options
    blog: Templates.BlogTemplate.Props;
    article: Templates.ArticleTemplate.Props;
    contact: Templates.PageTemplate.Props;
    product: Templates.ProductTemplate.Props;
    cart: Templates.CartTemplate.Props;
  },
  {
    favicon_image: string;
    opengraph_image: string;
    social_link_facebook: string;
    social_link_twitter: string;
    social_link_pinterest: string;
    social_link_instagram: string;
    social_link_linkedin: string;
    social_link_tumblr: string;
    social_link_snapchat: string;
    social_link_youtube: string;
    social_link_vimeo: string;
    social_share_facebook: boolean;
    social_share_twitter: boolean;
    social_share_pinterest: boolean;
    social_qr_we_chat: string;
    contact_phone: string;
    contact_email: string;
    contact_address: string;
    currencies: string;
    payment_methods: string;
    includes_header: string;
    includes_footer: string;
    blog_menu: string;
    checkout_header_image: string;
    checkout_logo_image: string;
    checkout_logo_position: string;
    checkout_logo_size: string;
    feature_collection_1: string;
    feature_collection_2: string;
    feature_collection_3: string;
    checkout_body_background_image: string;
    checkout_body_background_color: string;
    checkout_input_background_color_mode: string;
    checkout_sidebar_background_image: string;
    checkout_sidebar_background_color: string;
    checkout_heading_font: string;
    checkout_body_font: string;
    checkout_accent_color: string;
    checkout_button_color: string;
    checkout_error_color: string;
    social_share_image: string;
    social_instagram_userid: string;
    social_instagram_clientid: string;
    social_instagram_token: string;
    customer_layout: string;
    shipping_message: string;
    loyalty_variant_id: string;
    searchspring_index_id: string;
    cart_message: string;
    info_text: string;
    info_url: string;
    enable_price_based: boolean;
    gift_price_based_threshold: string;
    free_price_based_gift_handles: string;
    price_based_gift_message: string;
    product_based_threshold: string;
    enable_collection_based: boolean;
    free_collection_based_gift: string;
    collection_for_gift: string;
    collection_for_404: string;
    collection_based_sale_items: boolean;
    product_based_sale_items: boolean;
    price_based_sale_items: boolean;
    hatbox_sale_items: boolean;
    enable_product_based: boolean;
    collection_based_threshold: string;
    collection_based_gift_message: string;
    product_for_gift: string;
    free_gift_handles: string;
    product_based_gift_message: string;
    enable_hatboxes: boolean;
    hatbox_price_threshold: string;
    enable_threshold_based_product_price: boolean;
    text_alignment: string;
    link: string;
    text_link: string;
    text_font_size: number;
    text: string;
    button_color: string;
    gifts_based_on_qualified_items: boolean
    price_disable_if_all_sale_items_in_cart: boolean
    collection_disable_if_all_sale_items_in_cart: boolean
    product_disable_if_all_sale_items_in_cart: boolean
  }
  > { }


export declare namespace LinkList {
  interface Item {
    handle: string;
    title: string;
    links?: LinkList.Item[];
    url: string;
    type: string;
    active: boolean;
    child_active: boolean;
    object?: LinkList.Object | null;
  }
  interface Object {
    id: number;
    handle: string;
    image: string;
    title: string;
  }
}
export interface LinkList {
  handle: string;
  levels: number;
  title: string;
  links: LinkList.Item[];
  heading: string;
  active: boolean;
  child_active: boolean;
  object?: LinkList.Object | null;
  url: string;
  type: string;
}

export interface StoreLocation {
  code: string;
  name: string;
  address: string;
  opening_hours: string[];
  coordinates: {
    lat: number;
    lon: number;
  };
  selected: boolean;
  catchment: boolean;
  distance_km: number;
  inventory?: string;
  stock_available: boolean;
  phone: string;
  abn: string;
}

export interface Address {
  id: number,
  customer_id: number;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  name: string;
  province_code: string;
  country_code: string;
  country_name: string;
  default: boolean;
  form: Form
}

export interface StockData {
  data: {
    sku: string;
    locations: StoreLocation[]
  }[];
}

export interface Collection {
  id: number;
  title: string;
  handle: string;
  url: string;
  template_suffix: string;
  metafields: {
    dtk: {
      fields: {
        root: {
          blocks?: {}[];
          cards?: {
            position: number;
            title: string;
            image: string;
            link: string;
          }[];
        }
      }
    }
  }
}

export interface Product {
  available: boolean;
  type: string;
  id: number
  handle: string;
  url: string;
  title: string;
  product_type: string;
  vendor: string;
  description: string;
  featured_image: string;
  price: number;
  price_max: number;
  price_min: number;
  price_varies: number;
  compare_at_price: number;
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  first_available_variant: number;
  selected_or_first_available_variant: number;
  has_only_default_variant: boolean;
  options: string[];
  options_with_values: OptionWithValues[];
  tags: string[];
  grouped: [];
  colourCode: string;
  colourName: string;
  related_count: boolean;
  collections: Collection[];
  images: string[] | Image[];
  variants?: Variant[];
  variant_id?: number[];
  metafields: any;
  dynamic_buttons: string;
}

export interface Image {
  id: number;
  product_id: number;
  src?: string;
  alt: string;
  height: number;
  width: number;
  aspect_ratio: number;
  variants: [];
  attached_to_variant: boolean;
  position: number;
}

export interface JSONProduct {
  handle: string;
  title: string;
  image: Image;
  options: OptionWithValues[];
  id: string;
  variants: Variant[];
}

export interface OptionWithValues {
  name: string;
  position: number;
  values: string[];
}

export interface Variant {
  id: number;
  title: string;
  name: boolean;
  sku: number;
  barcode: string | number;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  options: string[];
  featured_image_position: number | null;
  available: boolean;
  price: number;
  compare_at_price: number;
  weight: number;
  taxable: boolean;
  requires_shipping: boolean;
  inventory_quantity: number;
  inventory_management: string;
  inventory_policy: string;
}

export interface Order {
  id: string;
  order_number: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  customer: number;
  customer_url: string;
  billing_address: string;
  shipping_address: string;
  shipping_price: number;
  subtotal_price: number;
  tax_price: number;
  total_discounts: number;
  total_price: number;
  order_status_url: string;
  financial_status: string;
  financial_status_label: string;
  fulfillment_status: string;
  fulfillment_status_label: string;
  created_at: string;
  cancelled: boolean;
  cancelled_at: string;
  cancel_reason: string;
  cancel_reason_label: string;
  line_items?: LineItem[];
  status: string;
  shipping_methods: {
    handle: string;
    original_price: number;
    price: number;
    title: string;
  }[];
  tax_lines: {
    price: number;
    rate: string
    rate_percentage: number;
    title: string;
  }[];
  transactions: {
    id: number;
    amount: number;
    created_at: string;
    gateway: string;
    kind: string;
    name: string;
    payment_details: {
      credit_card_company: string;
      credit_card_number: string;
    };
    receipt: {
      id: string;
      object: string;
      amount: string;
      amount_refunded: string;
      application: string;
      application_fee: string;
      application_fee_amount: string;
      captured: string;
      created: string;
      currency: string;
      customer: string;
      description: string;
      destination: string;
    };
    status: string;
    status_label: string;
  }[];
  discount_applications: {
    target_selection: string;
    target_type: string;
    title: string;
    total_allocated_amount: number;
    type: string;
    value: number;
    value_type: string;
  }[];
  attributes: {
    [key: string]: string;
  };
  tags: string[];
  metafields: any;
}

export interface LineItem {
  id: number;
  properties: {
    [key: string]: string;
  };
  collections: string[];
  quantity: number;
  variant_id: number;
  key: string;
  title: string;
  price: number;
  tags: string[];
  message: string;
  original_price: number;
  compare_at_price: number;
  compare_at_line_price: number;
  discounted_price: number;
  line_price: number;
  original_line_price: number;
  total_discount: number;
  discounts?: [];
  sku: string;
  grams: number;
  vendor: string;
  taxable: boolean;
  product_id: number;
  gift_card: boolean;
  url: string;
  image: string;
  handle: string;
  requires_shipping: boolean;
  product_type: string;
  product_title: string;
  product_description: string;
  product_vendor: string;
  hidden: boolean;
  variant_title: string;
  variant_options: string[];
  options_with_values: OptionWithValues[];
  options: string[];
  inventory_quantity: number;
  inventory_policy: string;
  selected_colour: null;
  selected_size: string;
  variants: Variant[];
}

type CustomSize = 'S' | 'M' | 'L' | 'XL'

type Cart = {
  items: Array<LineItem>
}
export interface GlobalProps extends ShopifyNext.Props<GlobalData> {
  match?: any;
  settings?: any;
  blocks?: any;
}
export interface GlobalState extends ShopifyNext.State { }

declare global {
  interface Window {
    dataLayer: any;
  }
}

