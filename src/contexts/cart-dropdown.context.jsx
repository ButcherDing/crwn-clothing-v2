import { createContext, useState } from "react";

// actual value you want to access

export const CartDropdownContext = createContext({
  cartItems: [],
  setCartItems: () => null,
  isCartOpen: false,
  setIsCartOpen: () => null,
});

// provider - the component you want to use to get access to the value
export const CartDropdownProvider = ({ children }) => {
  // set up your values (user data)
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const value = {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
