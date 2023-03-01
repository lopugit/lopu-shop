function productByHandleFragment (handle: string, fields: string[] = []): string {
  return `productByHandle(handle: "${handle}")  {
    ${fields.includes('id') || fields.length === 0 ? 'id' : ''}
    ${fields.includes('title') ? 'title' : ''}
    ${fields.includes('handle') ? 'handle' : ''}
    ${fields.includes('description') ? 'description' : ''}
    ${fields.includes('tags') ? 'tags' : ''}
    ${fields.includes(`price`) ? `priceRange {
      maxVariantPrice {
        amount
      }
      minVariantPrice {
        amount
      }
    }` : ``}
    ${fields.includes('options') ? `options {
      name
      values
    }` : ''}
    ${fields.includes('images') ? `images(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          src
        }
      }
    }` : ''}
    ${fields.includes('variants') ? `variants(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          image {
            src
          }
          price {
            amount
          }
          compareAtPrice {
            amount
          }
        }
      }
    }` : ''}
  }`
}

export function productByHandle (handle: string, fields: string[] = []): string {
  return `query {
    ${productByHandleFragment(handle, fields)}
  }`
}

export function productsByHandles (handles: string[], fields: string[] = []) : string {
  return `query {
    ${handles.map((handle, index) => {
      return `product_${index}: ${productByHandleFragment(handle, fields)}`
    })}
  }`
}

export function productsBySwatchTagFragment (tag: string): string {
  return `
    products(first: 250, query:"tag:'${tag}'") {
      edges {
        node {
          handle
        }
      }
    }`
}
export function productsBySwatchTag (tag: string): string {
  return `query {
    ${productsBySwatchTagFragment(tag)}
  }`
}

export function productsBySwatchTags (tags: string[]): string {
  // TODO remove when internal shopify API error is addressed in ticket #479 https://app.productive.io/1476-dotdev/task/3114507
  tags = tags.filter(tag => tag !== 'colours:tri-bag-large-rose-peony-cara')
  return `query {
    ${tags.map((tag) => {
      return `${tag.split(`:`)[1].replace(/\-/g, '_')}: ${productsBySwatchTagFragment(tag)}`
    })}
  }`
}
