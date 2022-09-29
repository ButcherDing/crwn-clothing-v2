import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
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
