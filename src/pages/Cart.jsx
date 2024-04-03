import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleAdd = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToAdd = cart.findIndex((el) => el.id === product.id);
    if (indexToAdd === -1) {
      const newArr = [
        ...cart,
        {
          id: product.id,
          title: product.title,
          parent_id: product.parent_id,
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newArr));
      setCartList(newArr);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartList(updatedCart);
    }
  };

  const handleRemove = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToRemove = cart.findIndex((el) => el.id === id);

    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[indexToRemove].quantity > 1) {
        updatedCart[indexToRemove].quantity -= 1;
      } else {
        updatedCart.splice(indexToRemove, 1);
      }

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
            <div className="btn-icon-wrapper ">
              <span className="btn-icon" onClick={() => handleAdd(item)}>
                +
              </span>
            </div>
            <span
              className="btn-icon delete"
              onClick={() => handleRemove(item.id)}
            >
              +
            </span>
            <p style={{ marginLeft: "10px" }}>
              Количество товара:{" "}
              <span style={{ color: "blue" }}>{item.quantity}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
