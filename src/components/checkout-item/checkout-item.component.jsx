import { useDispatch, useSelector } from "react-redux";
import QuantityButton from "../quantity-button/quantity-button.component";
import "./checkout-item.styles.scss";
import { removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));

  const { imageUrl, name, price } = cartItem;

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

//// oh boy - forgot to pass in two arguments to all actions. f me.
