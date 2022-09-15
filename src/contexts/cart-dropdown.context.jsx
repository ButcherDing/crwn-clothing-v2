import { createContext, useReducer } from "react";

import createAction from "../utils/reducer/reducer.utils";

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

export const CartDropdownContext = createContext({
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  setCartItems: () => null,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  cartCounter: () => null,
  plusQuantity: () => null,
  minusQuantity: () => null,
  setCartTotal: () => null,
});

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartDropdownReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    case "SET_IS_CART_OPEN":
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type in ${type} in cartDropdownReducer`);
  }
};

export const CartDropdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartDropdownReducer, INITIAL_STATE);
  const { cartItems, isCartOpen, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, newCartItem) => acc + newCartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, newCartItem) => total + newCartItem.price * newCartItem.quantity,
      0
    );
    //

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  // experimental - but we'd need to update all the places where the calls are made to the above, or just have all these functions call the below, passing in their type.
  // const setCartState = (value, valueType) => {
  //   dispatch({ type: CART_ACTION_TYPES[valueType], payload: value });
  // };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== itemToRemove.id
    );
    updateCartItemsReducer(newCartItems);
  };

  const plusQuantity = (cartItemToInc) => {
    const newCartItems = increaseCartItem(cartItems, cartItemToInc);
    updateCartItemsReducer(newCartItems);
  };
  const minusQuantity = (cartItemToInc) => {
    const newCartItems = decreaseCartItem(cartItems, cartItemToInc);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartItems,
    addItemToCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    plusQuantity,
    minusQuantity,
    removeItemFromCart,
    cartTotal,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
