import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems, setCartItems, isCartOpen } =
    useContext(CartDropdownContext);

  return (
    isCartOpen && (
      <div className="cart-dropdown-container">
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id}></CartItem>
          ))}
        </div>
        <Link to="/checkout">
          <Button>GO TO CHECKOUT</Button>
        </Link>
      </div>
    )
  );
};

export default CartDropdown;
