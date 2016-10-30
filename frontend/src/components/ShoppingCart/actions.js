export const SHOPPING_CART_ADD_PRODUCT = 'SHOPPING_CART_ADD_PRODUCT';
export const SHOPPING_CART_RESET = 'SHOPPING_CART_RESET';
export const SHOPPING_CART_REMOVE_PRODUCT = 'SHOPPING_CART_REMOVE_PRODUCT';

export const addToCart = product => {
  return {
    type: SHOPPING_CART_ADD_PRODUCT,
    product,
  };
};

export const resetCart = () => {
  return { type: SHOPPING_CART_RESET };
}

export const removeCartProduct = productId => {
  return {
    type: SHOPPING_CART_REMOVE_PRODUCT,
    productId,
  };
}
