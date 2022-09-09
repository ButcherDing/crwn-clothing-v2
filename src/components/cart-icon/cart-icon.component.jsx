import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartDropdownContext);

  const cartToggler = () => {
    !isCartOpen ? setIsCartOpen(true) : setIsCartOpen(false);
  };

  return (
    <div className="cart-icon-container" onClick={cartToggler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
