import "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate("/checkout");

  return (
    isCartOpen && (
      <CartDropdownContainer>
        <CartItems>
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id}></CartItem>
            ))
          ) : (
            <EmptyMessage>No items in cart</EmptyMessage>
          )}
        </CartItems>

        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
      </CartDropdownContainer>
    )
  );
};

export default CartDropdown;
