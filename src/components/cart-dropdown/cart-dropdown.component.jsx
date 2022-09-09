import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems, setCartItems, isCartOpen } =
    useContext(CartDropdownContext);

  console.log(cartItems);
  // setCartItems(cartItems);
  return (
    isCartOpen && (
      <div className="cart-dropdown-container">
        <div className="cart-item-container">
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id}></CartItem>
          ))}
        </div>
        <Button>GO TO CHECKOUT</Button>
      </div>
    )
  );
};

export default CartDropdown;
