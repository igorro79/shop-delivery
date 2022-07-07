import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import ProductList from "./components/productList/ProductList";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import "./App.css";
// import { getShopList } from "./shared/api/shopApi";
import operation from "./redux/shop/shop-operations";
import { add, erase } from "./redux/cart/cart-slice";
import { getShops } from "./redux";

function App() {
  const { data } = useSelector(getShops);
  const dispatch = useDispatch();

  const handleAddButton = function ({ params, product }) {
    const object = {
      id: Date.now(),
      shop: params.shop,
      item: product,
      quantity: 1,
    };
    dispatch(add(object));
  };

  useEffect(() => {
    dispatch(operation.fetchShopList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home shopList={data} />}>
          {data.map((shop) => (
            <Route
              key={shop.id}
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
