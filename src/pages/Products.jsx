import { useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = ({ goods }) => {
  const [itemsToShow, setItemsToShow] = useState(30);
  const [hasMore, setHasMore] = useState(true);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const loadMoreItems = () => {
    if (itemsToShow >= goods.length) {
      setHasMore(false);
      return;
    }
    setItemsToShow(itemsToShow + 1);
  };

  return (
    <div className="goods-wrapper">
      <InfiniteScroll
        dataLength={itemsToShow}
        next={loadMoreItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div>
          {goods.slice(0, itemsToShow).map((item) => (
            <Link
              key={item.data.id}
              className="goods-item"
              to={`/${item.data.parent_id}/${item.data.name}/${item.data.id}`}
            >
              <div style={{ padding: "5px" }}>{item.data.title}</div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
      <Link to="/cart" className="link">
        <h3>Products in cart: {cart.length}</h3>
      </Link>
    </div>
  );
};

export default Products;
