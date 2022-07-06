import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import ProductList from "./components/productList/ProductList";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import "./App.css";
import { getShopList } from "./shared/api/shopApi";
import operation from "./redux/shop/shop-operations";
import { selectors } from "./redux/shop/shop-selectors";

function App() {
  const [shopList, setShopList] = useState([]);
  const data = useSelector(selectors.getShops);
  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operation.fetchShopList());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home shopList={shopList} />}>
          {shopList.map((shop) => (
            <Route
              key={shop.id}
              path=":shop"
              element={<ProductList products={shop.products} />}
            />
          ))}
        </Route>
        <Route path="cart" element={<Cart />} />{" "}
        <Route path="/" element={<Navigate to="home" replace />} />
      </Route>
    </Routes>

    // <div>
    //   <Header />
    //   <Outlet />
    // </div>
  );
}

export default App;
