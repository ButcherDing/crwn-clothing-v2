import { useDispatch, useSelector } from "react-redux";
import QuantityButton from "../quantity-button/quantity-button.component";
import {
  CheckoutItemContainer,
  CheckoutItemDetail,
  CheckoutImageContainer,
  Quantity,
  RemoveButton,
} from "./checkout-item.styles";
import { removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";
import { FC } from "react";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { imageUrl, name, price } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <CheckoutImageContainer>
        <img src={imageUrl} alt={name}></img>
      </CheckoutImageContainer>

      <CheckoutItemDetail>{name}</CheckoutItemDetail>
      {/* // I want to style this directly instead of having to stick it in a div like a divhead. */}
      <Quantity>
        <QuantityButton cartItem={cartItem} />
      </Quantity>

      <CheckoutItemDetail>{price}</CheckoutItemDetail>

      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
