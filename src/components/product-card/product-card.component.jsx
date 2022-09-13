import "./product-card.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  /////
  const { setCartItems, cartItems, addItemToCart } =
    useContext(CartDropdownContext);

  const addProductToCart = () => addItemToCart(product);
  /////

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`}></img>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
