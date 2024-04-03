import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { getGoodsIds, getGoods } from "./utils";
import Cart from "./pages/Cart";

function App() {
  const [goodsIds, setGoodsIds] = useState([]);
  const [goods, setGoods] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(30);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getGoodsIds()
      .then((response) => response.json())
      .then((data) => setGoodsIds(data.goods.sortedAll))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (goodsIds.length > 0) {
      const loadItems = async () => {
        const promises = goodsIds.slice(0, itemsToShow).map((id) =>
          getGoods(id)
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
      };

      loadItems();
    }
  }, [goodsIds, itemsToShow]);

  const loadMoreItems = () => {
    if (itemsToShow >= 200) {
      setHasMore(false);
      return;
    }
    setItemsToShow(itemsToShow + 30);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Products
              goods={goods}
              hasMore={hasMore}
              loadMoreItems={loadMoreItems}
              itemsToShow={itemsToShow}
            />
          }
        />
        <Route path=":parent_id/:name/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
