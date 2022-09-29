import { useDispatch, useSelector } from "react-redux";
import { plusQuantity, minusQuantity } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { QuantityContainer, Arrow, Value } from "./quantity-button.styles";

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
    <QuantityContainer>
      <Arrow onClick={minusHandler}>&#10094;</Arrow>
      <Value>{cartItem.quantity}</Value>
      <Arrow onClick={plusHandler}>&#10095;</Arrow>
    </QuantityContainer>
  );
};

export default QuantityButton;
