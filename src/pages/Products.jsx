import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = ({ goods, itemsToShow, loadMoreItems, hasMore }) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();

  const goodsQuantity = cart.reduce((acc, el) => acc + el.quantity, 0);

  return (
    <div className="goods-wrapper">
      <InfiniteScroll
        dataLength={itemsToShow}
        next={loadMoreItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div>
          {goods.map((item) => (
            <div
              key={item.data.id}
              className="goods-item"
              onClick={() => {
                localStorage.setItem("product", JSON.stringify(item));
                navigate(
                  `/${item.data.parent_id}/${item.data.name}/${item.data.id}`
                );
              }}
            >
              <div style={{ padding: "5px" }}>{item.data.title}</div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <Link to="/cart" className="link">
        <h3>Products in cart: {goodsQuantity || 0}</h3>
      </Link>
    </div>
  );
};

export default Products;
