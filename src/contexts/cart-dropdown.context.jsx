import { createContext, useState } from "react";

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

export const CartDropdownContext = createContext({
  cartItems: [],
  setCartItems: () => null,
  isCartOpen: false,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  cartCounter: () => null,
});

// provider - the component you want to use to get access to the value
export const CartDropdownProvider = ({ children }) => {
  // set up your values (user data)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const cartCounter = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );

  const value = {
    cartItems,
    setCartItems,
    addItemToCart,
    isCartOpen,
    setIsCartOpen,
    cartCounter,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
