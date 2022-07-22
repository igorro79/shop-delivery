import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Outlet } from "react-router-dom";
import operation from "./redux/shop/shop-operations";
import { add, erase } from "./redux/cart/cart-slice";
import { getShops } from "./redux";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import History from "./pages/history/History";
import ProductList from "./components/productList/ProductList";
import Header from "./components/header/Header";

function App() {
  const { data } = useSelector(getShops);
  const dispatch = useDispatch();

  const handleAddButton = function ({ params, product, cart }) {
    // ============= check for products from different shop in cart ================
    if (cart.length && cart[0].shop !== params.shop) {
      const answer = window.confirm(
        "You have products from another shop in you cart. Want to clean the cart?"
      );
      if (answer) {
        const object = {
          id: Date.now(),
          shop: params.shop,
          item: product,
          quantity: 1,
        };
        dispatch(erase());
        dispatch(add(object));
      }
    }
    //================================
    else {
      const object = {
        id: Date.now(),
        shop: params.shop,
        item: product,
        quantity: 1,
      };
      dispatch(add(object));
    }
  };

  useEffect(() => {
    dispatch(operation.fetchShopList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="history" element={<History shopList={data} />} />
        <Route path="/" element={<Home shopList={data} />}>
          {data &&
            data.map((shop) => (
              <Route
                key={shop._id}
                path=":shop"
                element={<ProductList onClick={handleAddButton} />}
              />
            ))}
        </Route>
        <Route path="cart" element={<Cart />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
