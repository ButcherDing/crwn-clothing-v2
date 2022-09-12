import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";
import QuantityButton from "../quantity-button/quantity-button.component";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart } = useContext(CartDropdownContext);

  const removeItem = () => removeItemFromCart(cartItem);

  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <div className="checkout-item-container">
      <div className="checkout-item">
        <img src={imageUrl}></img>
        <span>{name}</span>
        <QuantityButton cartItem={cartItem} />
        <span>{price}</span>
        <span onClick={removeItem}>X</span>
      </div>
    </div>
  );
};

export default CheckoutItem;
