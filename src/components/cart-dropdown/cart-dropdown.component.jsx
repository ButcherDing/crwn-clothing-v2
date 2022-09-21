import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);

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
