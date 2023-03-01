export const DEFAULT_MAX_SELECTABLE_QTY = 2
export const UNLIMITED_SELECTABLE_QTY = 99999

export const checkItemQuantityLimit = (item): boolean => {
  const excludeSkus = [
    'MKT10641',
    'MKT10640',
    'MKT10642',
    'MKT10639',
    'MKT10638'
  ]

  // Exclude Gift Card or anything that does not have SKU
  if (!item.sku || item.sku === '' || excludeSkus.includes(item.sku)) {
    return false
  }

  return true
}

export const getMaxSelectableQuantity = (item): number => {
  return checkItemQuantityLimit(item) ? DEFAULT_MAX_SELECTABLE_QTY : UNLIMITED_SELECTABLE_QTY
}


export const getLimitedCartItems = (cartItems) => {
  return cartItems?.reduce((result, item) => {
    if (checkItemQuantityLimit(item)) {
      result[`${item.variant_id}`] = result[`${item.variant_id}`] ? result[`${item.variant_id}`] + item.quantity : item.quantity
    }
    
    return result
  }, {}) || {}
}