import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleRemove = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToRemove = cart.findIndex((el) => el.id === id);

    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);

      setCartList(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <>
      <Link to="/" className="link">
        <p>{"< "}Back </p>
      </Link>
      <div className="cart-wrapper">
        {cartList.map((item, index) => (
          <div key={index} className="cart-item">
            <div>{item.title}</div>
            <span className="delete-icon" onClick={() => handleRemove(item.id)}>
              +
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
