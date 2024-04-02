import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { getGoodsIds, getGoods } from "./utils";
import Cart from "./pages/Cart";

function App() {
  const [goodsIds, setGoodsIds] = useState([]);
  const [goods, setGoods] = useState([]);
  
  useEffect(() => {
    getGoodsIds()
      .then((response) => response.json())
      .then((data) => setGoodsIds(data.goods.sortedAll))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (goodsIds) {
      const promises = goodsIds.map((item) =>
        getGoods(item)
          .then((response) => response.json())
          .then((data) => data)
      );

      Promise.all(promises)
        .then((results) => {
          setGoods(results);
        })
        .catch((error) => {
          console.error("Error fetching goods:", error);
        });
    }
  }, [goodsIds]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Products goods={goods} />} />
        <Route
          path=":parent_id/:name/:id"
          element={<Product goods={goods} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
