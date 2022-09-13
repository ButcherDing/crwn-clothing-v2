import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";
import QuantityButton from "../quantity-button/quantity-button.component";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart } = useContext(CartDropdownContext);

  const removeItem = () => removeItemFromCart(cartItem);

  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl}></img>
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <QuantityButton cartItem={cartItem} />
      </div>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
