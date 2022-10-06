import { FC } from "react";
import { CartItem as TCartItem } from "../../store/cart/cart.types";
import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
} from "./cart-item.styles";

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt="{name}"></CartItemImage>
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
