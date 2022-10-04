import { createSelector } from "reselect";

import { CartItem } from "./cart.types";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (acc: number, newCartItem: CartItem) => acc + newCartItem.quantity,
    0
  )
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, newCartItem: CartItem) =>
      total + newCartItem.price * newCartItem.quantity,
    0
  )
);
