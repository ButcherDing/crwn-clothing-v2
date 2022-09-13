import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";

export const QuantityButton = ({ cartItem }) => {
  const { plusQuantity, minusQuantity } = useContext(CartDropdownContext);

  const plusHandler = () => {
    plusQuantity(cartItem);
  };
  const minusHandler = () => {
    minusQuantity(cartItem);
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
