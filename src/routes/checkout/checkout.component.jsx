import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartDropdownContext);

  // const totalPrice = cartItems.reduce(
  //   (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
  //   0
  // );

  return (
    <div className="checkout-container">
      <div className="checkout-headers">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        console.log(cartItem.id);
        return <CheckoutItem cartItem={cartItem} id={cartItem.id} />;
      })}
      <span className="total">Total: $ {cartTotal}</span>
    </div>
  );
};

export default Checkout;
