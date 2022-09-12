import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

export const Checkout = () => {
  const { cartItems } = useContext(CartDropdownContext);

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
    </div>
  );
};

export default Checkout;
