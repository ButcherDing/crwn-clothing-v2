import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

export const Checkout = () => {
  const { cartItems, checkoutTotal } = useContext(CartDropdownContext);

  const totalPrice = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <div className="checkout-headers">
        <span className="checkout-header">Product</span>
        <span className="checkout-header">Description</span>
        <span className="checkout-header">Quantity</span>
        <span className="checkout-header">Price</span>
        <span className="checkout-header">Remove</span>
      </div>
      <div className="checkout-items">
        {cartItems.map((cartItem) => (
          <CheckoutItem cartItem={cartItem} id={`checkout:` + cartItem.id} />
        ))}
      </div>
      <h2>Total</h2>
      <h2>{totalPrice}</h2>
    </div>
  );
};

export default Checkout;
