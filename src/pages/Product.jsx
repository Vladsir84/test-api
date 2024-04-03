import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem("product");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.data.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newArr = [
        ...cart,
        {
          id: product.data.id,
          title: product.data.title,
          parent_id: product.data.parent_id,
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newArr));
    }
  };

  const handleRemove = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToRemove = cart.findIndex((el) => el.id === params.id);

    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      const itemToRemove = updatedCart[indexToRemove];

      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity -= 1;
      } else {
        updatedCart.splice(indexToRemove, 1);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <>
      <Link to="/" className="link">
        <p>{"< "}Back </p>
      </Link>
      <div className="product-wrapper">
        <h1 style={{ marginTop: "0px" }}>{product?.data?.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: product?.data?.description }} />
        <div className="product-chars">
          <div>
            <h2>Характеристики:</h2>
            {product &&
              Object.values(product?.data?.characteristics).map((item) => (
                <div key={item?.id} className="chars-wrapper">
                  <p>{item?.title}:</p>
                  <p style={{ marginLeft: "20px" }}>{item?.value}</p>
                </div>
              ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h2>Цена:</h2>
              <p style={{ marginLeft: "20px" }}>{product?.data?.price}</p>
            </div>
          </div>
          <img
            src={product?.data?.images?.[0]}
            alt=""
            className="product-image"
          />
        </div>

        <div className="btns-wrapper">
          <button onClick={handleAdd} className="product_btn">
            Add to cart
          </button>
          <button onClick={handleRemove} className="product_btn del_btn">
            Remove from cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
