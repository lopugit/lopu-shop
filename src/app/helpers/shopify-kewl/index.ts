import axios from 'axios';
import * as queries from './queries';
import { Config, GraphQlProduct, Product } from './types';

const countryConversionList = {
  AD: 'EUR',
  AE: 'AED',
  AF: 'AFN',
  AG: 'XCD',
  AI: 'XCD',
  AL: 'ALL',
  AM: 'AMD',
  AO: 'AOA',
  AR: 'ARS',
  AS: 'USD',
  AT: 'EUR',
  AU: 'AUD',
  AW: 'AWG',
  AX: 'EUR',
  AZ: 'AZN',
  BA: 'BAM',
  BB: 'BBD',
  BD: 'BDT',
  BE: 'EUR',
  BF: 'XOF',
  BG: 'BGN',
  BH: 'BHD',
  BI: 'BIF',
  BJ: 'XOF',
  BL: 'EUR',
  BM: 'BMD',
  BN: 'BND',
  BO: 'BOB',
  BQ: 'USD',
  BR: 'BRL',
  BS: 'BSD',
  BT: 'BTN',
  BV: 'NOK',
  BW: 'BWP',
  BY: 'BYN',
  BZ: 'BZD',
  CA: 'CAD',
  CC: 'AUD',
  CD: 'CDF',
  CF: 'XAF',
  CG: 'CDF',
  CH: 'CHF',
  CI: 'XOF',
  CK: 'NZD',
  CL: 'CLP',
  CM: 'XAF',
  CN: 'CNY',
  CO: 'COP',
  CR: 'CRC',
  CU: 'CUC',
  CV: 'CVE',
  CW: 'ANG',
  CX: 'AUD',
  CY: 'EUR',
  CZ: 'CZK',
  DE: 'EUR',
  DJ: 'DJF',
  DK: 'DKK',
  DM: 'DOP',
  DO: 'DOP',
  DZ: 'DZD',
  EC: 'USD',
  EE: 'EUR',
  EG: 'EGP',
  EH: 'MAD',
  ER: 'ERN',
  ES: 'EUR',
  ET: 'ETB',
  FI: 'EUR',
  FJ: 'FJD',
  FM: 'USD',
  FO: 'DKK',
  FR: 'EUR',
  GA: 'XAF',
  GB: 'GBP',
  GD: 'XCD',
  GE: 'GEL',
  GF: 'EUR',
  GG: 'GBP',
  GH: 'GHS',
  GI: 'GIP',
  GL: 'DKK',
  GM: 'GMD',
  GN: 'GNF',
  GP: 'EUR',
  GQ: 'XAF',
  GR: 'EUR',
  GT: 'GTQ',
  GU: 'USD',
  GW: 'XOF',
  GY: 'GYD',
  HK: 'HKD',
  HN: 'HNL',
  HR: 'HRK',
  HT: 'HTG',
  HU: 'HUF',
  ID: 'IDR',
  IE: 'EUR',
  IL: 'ILS',
  IM: 'GBP',
  IN: 'INR',
  IO: 'USD',
  IQ: 'IQD',
  IR: 'IRR',
  IS: 'ISK',
  IT: 'EUR',
  JE: 'GBP',
  JM: 'JMD',
  JO: 'JOD',
  JP: 'JPY',
  KE: 'KES',
  KG: 'KGS',
  KH: 'KHR',
  KI: 'AUD',
  KM: 'KMF',
  KN: 'XCD',
  KP: 'KPW',
  KR: 'KRW',
  KW: 'KWD',
  KY: 'KYD',
  KZ: 'KZT',
  LB: 'LBP',
  LC: 'XCD',
  LI: 'CHF',
  LK: 'LKR',
  LR: 'LRD',
  LS: 'LSL',
  LT: 'EUR',
  LU: 'EUR',
  LV: 'EUR',
  LY: 'LYD',
  MA: 'MAD',
  MC: 'EUR',
  MD: 'MDL',
  ME: 'EUR',
  MF: 'EUR',
  MG: 'MGA',
  MH: 'USD',
  ML: 'XOF',
  MM: 'MMK',
  MN: 'MNT',
  MO: 'MOP',
  MP: 'USD',
  MQ: 'EUR',
  MR: 'MRU',
  MS: 'XCD',
  MT: 'EUR',
  MU: 'MUR',
  MV: 'MVR',
  MW: 'MWK',
  MX: 'MXN',
  MY: 'MYR',
  MZ: 'MZN',
  NA: 'NAD',
  NC: 'XPF',
  NE: 'NGN',
  NF: 'AUD',
  NG: 'NGN',
  NI: 'NIO',
  NL: 'EUR',
  NO: 'NOK',
  NP: 'NPR',
  NR: 'AUD',
  NU: 'NZD',
  NZ: 'NZD',
  OM: 'OMR',
  PA: 'PAB',
  PE: 'PEN',
  PF: 'XPF',
  PG: 'PGK',
  PH: 'PHP',
  PK: 'PKR',
  PL: 'PLN',
  PM: 'EUR',
  PN: 'NZD',
  PR: 'USD',
  PT: 'EUR',
  PW: 'USD',
  PY: 'PYG',
  QA: 'QAR',
  RE: 'EUR',
  RO: 'RON',
  RS: 'RSD',
  RU: 'RUB',
  RW: 'RWF',
  SA: 'SAR',
  SB: 'SBD',
  SC: 'SCR',
  SD: 'SDG',
  SE: 'SEK',
  SG: 'SGD',
  SH: 'SHP',
  SI: 'EUR',
  SJ: 'NOK',
  SK: 'EUR',
  SL: 'SLL',
  SM: 'EUR',
  SN: 'XOF',
  SO: 'SOS',
  SR: 'SRD',
  SS: 'SSP',
  ST: 'STN',
  SV: 'SVC',
  SX: 'ANG',
  SY: 'SYP',
  SZ: 'SZL',
  TC: 'USD',
  TD: 'XAF',
  TF: 'EUR',
  TG: 'XOF',
  TH: 'THB',
  TJ: 'TJS',
  TK: 'NZD',
  TL: 'USD',
  TM: 'TMT',
  TN: 'TND',
  TO: 'TOP',
  TR: 'TRY',
  TT: 'TTD',
  TV: 'AUD',
  TW: 'TWD',
  TZ: 'TZS',
  UA: 'UAH',
  UG: 'UGX',
  UM: 'USD',
  US: 'USD',
  UY: 'UYU',
  UZ: 'UZS',
  VA: 'EUR',
  VC: 'XCD',
  VE: 'VES',
  VG: 'USD',
  VI: 'USD',
  VN: 'VND',
  VU: 'VUV',
  WF: 'XPF',
  WS: 'USD',
  YE: 'YER',
  YT: 'EUR',
  ZA: 'ZAR',
  ZM: 'ZMW',
  ZW: 'ZWL',
  HM: 'AUD',
  FK: 'FKP',
  GS: 'GEL',
  LA: 'LAK',
  MK: 'MKD',
  AQ: 'USD',
  PS: 'ILS'
}

export class ShopifyKewl {
  storeURL: string;
  graphPath: string;
  storeFrontKey: string;
  url: string;
  config: {
    headers: {
      'Accept': string;
      'Content-Type': string;
      'X-Shopify-Storefront-Access-Token': string;
    };
  };
  queries: any;

  constructor(config: Config) {
    const { store, graphPath = '/api/2022-10/graphql', storeFrontKey } = config || {
      store: null,
      storeFrontKey: null
    }
    if (!store || !storeFrontKey) {
      throw new Error('Missing store or storefront key')
    }
    this.storeURL = `${store}.myshopify.com`;
    this.graphPath = graphPath;
    this.storeFrontKey = storeFrontKey;
    this.url = `https://${this.storeURL}${this.graphPath}`;
    this.config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': this.storeFrontKey,
      }
    }
    this.queries = queries;
  }

  async query(query: string) {
    const res = await axios.post(this.url, query, this.config)
    return res
  }

  async productByHandle(handle: string, fields?: string[]) {
    const query = this.queries.productByHandle(handle, fields);
    const res = await this.query(query);
    return this.normalizeProduct(res.data.data.productByHandle);
  }

  async productsByHandles(handles: string[], fields?: string[]) {
    const products = []
    const query = this.queries.productsByHandles(handles, fields)
    const res = await this.query(query)
    Object.keys(res.data.data).forEach(key => {
      if(!res.data.data[key]) {
       products.push({})
      } else {
        products.push(this.normalizeProduct(res.data.data[key]))
      }
    })
    return products
  }

  async productsBySwatchTag(tag: string) {
    const query = this.queries.productsBySwatchTag(tag);
    const res = await this.query(query);
    return this.normalizeProducts(res.data.data.products.edges);
  }

  async productsBySwatchTags(tags: string[]) {
    // Group tags into chunks of 80 since query has a max limit of 89 products
    const perChunk = 80
    const tagChunks = tags?.reduce((resultArray, tag, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].push(tag)

      return resultArray
    }, [])

    let totalRes = null
    for (const tagChunk of tagChunks) {
      const query = this.queries.productsBySwatchTags(tagChunk)
      const res = await this.query(query)
      if (res.data.data) {
        totalRes = { ...totalRes, ...res.data.data }
      }
    }

    const products = {}
    if (totalRes) {
      Object.keys(totalRes).forEach(key => {
        products[key] = this.normalizeProducts(totalRes[key].edges)
      })
    }
    return products
  }

  async getCurrencyExchangeRate(currency) {
    const localization = await this.query(`query {
      localization {
        availableCountries {
          isoCode
        }
      }
    }`)
    const country = localization.data.data?.localization?.availableCountries?.find(country => countryConversionList[country?.isoCode] === currency)?.isoCode

    const product = await this.query(`query @inContext(country: ${country}) {
      productByHandle(handle: "currency")  {
        priceRange {
          maxVariantPrice {
            amount
          }
        }
      }
    }`)

    return parseFloat(product.data.data?.productByHandle?.priceRange?.maxVariantPrice?.amount)
  }

  normalizeProduct(p: GraphQlProduct) {
    if (!p) {
      return {}
    }
    const pro = p.node ? p.node : p;
    const images = []
    const variants = []
    if (pro.images) {
      for (let img of pro.images.edges){
        images.push(img.node.src)
      }
    }

    if (pro.variants) {
      for (let v of pro.variants.edges) {
        const variant = {
          id: v.node.id,
          image: v.node.image.src,
          price: Number(v.node.price) * 100,
          title: v.node.title,
          compare_at_price: Number(v.node.compareAtPrice) * 100
        }
        variants.push(variant)
      }
    }

    const product: Product = {}

    pro.id ? product[`id`] =  pro.id : null;
    pro.handle ? product[`handle`] = pro.handle : null;
    pro.description ? product[`description`] = pro.description : null;
    pro.title ? product[`title`] = pro.title : null;
    images.length ? product[`images`] = [...images] : null;
    variants.length ? product[`variants`] = [...variants] : null
    pro.tags ? product[`tags`] = pro.tags : null;

    if (pro.priceRange && pro.priceRange.maxVariantPrice && pro.priceRange.maxVariantPrice.amount) {
      product.price_min = parseInt(pro.priceRange.maxVariantPrice.amount) * 100
    }
    return product
  }

  normalizeProducts(products: GraphQlProduct[]) {
    return products.map(product => this.normalizeProduct(product))
  }
}
