import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

const CartDropdown = () => {
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useContext(CartDropdownContext);

  return (
    isCartOpen && (
      <div className="cart-dropdown-container">
        <div className="cart-items"></div>
        <Button>GO TO CHECKOUT</Button>
      </div>
    )
  );
};

export default CartDropdown;
