import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Product = ({ goods }) => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    goods.forEach((el) => {
      if (el?.data?.id?.includes(params.id)) {
        setProduct(el?.data);
      }
    });
  }, [goods, params]);

  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newArr = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(newArr));
  };

  const handleRemove = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToRemove = cart.findIndex((el) => el.id === params.id);

    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <>
      <Link to="/" className="link">
        <p>{"< "}Back </p>
      </Link>
      <div className="product-wrapper">
        <h1 style={{ marginTop: "0px" }}>{product?.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: product?.description }} />
        <div className="product-chars">
          <div>
            <h2>Характеристики:</h2>
            {product &&
              Object.values(product?.characteristics).map((item) => (
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
              <p style={{ marginLeft: "20px" }}>{product?.price}</p>
            </div>
          </div>
          <img src={product?.images?.[0]} alt="" className="product-image" />
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
