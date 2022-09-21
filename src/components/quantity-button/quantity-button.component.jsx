import { useDispatch, useSelector } from "react-redux";
import { plusQuantity, minusQuantity } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

export const QuantityButton = ({ cartItem }) => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const plusHandler = () => {
    dispatch(plusQuantity(cartItems, cartItem));
  };
  const minusHandler = () => {
    dispatch(minusQuantity(cartItems, cartItem));
  };

  return (
    <div className="quantity">
      <span className="arrow" onClick={minusHandler}>
        &#10094;
      </span>
      <span className="value">{cartItem.quantity}</span>
      <span className="arrow" onClick={plusHandler}>
        &#10095;
      </span>
    </div>
  );
};

export default QuantityButton;
