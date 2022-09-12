import { createContext, useState, useEffect } from "react";

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
  setCartItems: () => null,
  isCartOpen: false,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  cartCounter: () => null,
  plusQuantity: () => null,
  minusQuantity: () => null,
});

// provider - the component you want to use to get access to the value
export const CartDropdownProvider = ({ children }) => {
  // set up your values (user data)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const plusQuantity = (cartItemToInc) => {
    setCartItems(increaseCartItem(cartItems, cartItemToInc));
  };
  const minusQuantity = (cartItemToInc) => {
    setCartItems(decreaseCartItem(cartItems, cartItemToInc));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(
      cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
    );
  };

  const checkoutTotal = () => {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
  };

  // const minusQuantity = (cartItem) =>
  //   setCartItems([
  //     ...cartItems,
  //     { ...cartItem, quantity: cartItem.quantity - 1 },
  //   ]);

  // const plusQuantity = (cartItem) => {
  //   setCartItems([
  //     ...cartItems,
  //     { ...cartItem, quantity: cartItem.quantity + 1 },
  //   ]);
  // };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const value = {
    cartItems,
    setCartItems,
    addItemToCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    plusQuantity,
    minusQuantity,
    removeItemFromCart,
    // minusQuantity,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
