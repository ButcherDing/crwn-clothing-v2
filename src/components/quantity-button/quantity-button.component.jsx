import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";

export const QuantityButton = ({ cartItem }) => {
  const { plusQuantity, minusQuantity } = useContext(CartDropdownContext);

  const plus = () => {
    plusQuantity(cartItem);
  };
  const minus = () => {
    minusQuantity(cartItem);
  };

  return (
    <div>
      <span onClick={minus}>-----</span>
      <span>{cartItem.quantity}</span>
      <span onClick={plus}>+++++</span>
    </div>
  );
};

export default QuantityButton;
