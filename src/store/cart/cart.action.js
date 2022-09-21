import { CART_ACTION_TYPES } from "./cart.types";
import createAction from "../../utils/reducer/reducer.utils";

/// HELPER FUNCTIONS (not directly called by components)

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const increaseCartItem = (cartItems, cartItemToInc) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToInc.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};
const decreaseCartItem = (cartItems, cartItemToInc) => {
  if (cartItemToInc.quantity === 0) return cartItems;
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToInc.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

/// action setters

export const setCartItems = (cartArray) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartArray);

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

///

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = cartItems.filter(
    (cartItem) => cartItem.id !== itemToRemove.id
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const plusQuantity = (cartItems, cartItemToInc) => {
  const newCartItems = increaseCartItem(cartItems, cartItemToInc);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const minusQuantity = (cartItems, cartItemToInc) => {
  const newCartItems = decreaseCartItem(cartItems, cartItemToInc);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
