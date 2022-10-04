import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";

/// HELPER FUNCTIONS (not directly called by components)

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingItem = cartItems.find(
    (cartItem: CartItem) => cartItem.id === productToAdd.id
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

const increaseCartItem = (
  cartItems: CartItem[],
  cartItemToInc: CartItem
): CartItem[] => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToInc.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};
const decreaseCartItem = (
  cartItems: CartItem[],
  cartItemToInc: CartItem
): CartItem[] => {
  if (cartItemToInc.quantity === 0) return cartItems;
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToInc.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

/// ACTION SETTERS

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

///

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const plusQuantity = (
  cartItems: CartItem[],
  cartItemToInc: CartItem
) => {
  const newCartItems = increaseCartItem(cartItems, cartItemToInc);
  return setCartItems(newCartItems);
};
export const minusQuantity = (
  cartItems: CartItem[],
  cartItemToInc: CartItem
) => {
  const newCartItems = decreaseCartItem(cartItems, cartItemToInc);
  return setCartItems(newCartItems);
};

// Should we not be adding labels to functions for clarity? Like 'hel' for helper, act for action, etc? I think it becomes a lot easier to read. So what if we need a few more letters. People can actually read our code. We don't want to be code ninjas.
