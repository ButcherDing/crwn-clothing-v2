import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  console.log(cartItem);
  const { name, imageUrl, quantity, price } = cartItem;

  return (
    <div>
      <img className="" src={imageUrl}></img>
      <div className="item-details">
        <h2>{name}</h2>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
