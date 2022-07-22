import React, { useCallback, useState } from "react";
import { getCart } from "../../redux";
import styled from "styled-components";
import { useJsApiLoader } from "@react-google-maps/api";

import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/cartList/CartList";
import { erase } from "../../redux/cart/cart-slice";
import operations from "../../redux/cart/cart-operations";
import { Container } from "../../components/container/Container";
import Map from "../../components/map/Map";
import { Autocomplite } from "../../components/autocomplite/Autocomplite";

const Form = styled.form`
  font-size: 20px;
  padding: 50px 40px;
`;

const WrapperDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;
const Credentials = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-right: 50px;
  & :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const Input = styled.input`
  font-size: 20px;
  padding: 10px 15px;
  border-radius: 5px;
`;
const EmptyCart = styled.li`
  font-size: 30px;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
`;
const Total = styled.span`
  font-size: 30px;
  font-weight: 700;
  margin-left: auto;
  margin-right: 150px;
`;

const SubmitButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  background-color: orange;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: gold;
  }
`;
const libraries = ["places"];
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function Cart() {
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();

  const defaultCenter = { lat: 50.4498, lng: 30.507 };
  const [center, setCenter] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const total = cart.reduce(function (acc, next) {
    return acc + next.item.price * next.quantity;
  }, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const goods = cart.map((product) => {
    const temp = {
      name: product.item.name,
      price: product.item.price,
      quantity: product.quantity,
    };
    return temp;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      shop: cart[0].shop,
      order: goods,
      sum: total,
    };
    // console.log(newOrder);
    dispatch(operations.postOrder(newOrder));
    alert("You order has been added. ");
    dispatch(erase());
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };
  const onSelect = useCallback((coordinates) => setCenter(coordinates), []);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <WrapperDiv>
          <Credentials>
            {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
            <label htmlFor="name">First name:</label>
            <Input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone:</label>
            <Input
              required
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="address">address:</label>
            <Autocomplite
              isLoaded={isLoaded}
              onSelect={onSelect}
              passValue={setAddress}
              reset={address}
            />
          </Credentials>
          {cart.length ? (
            <CartList cartList={cart} />
          ) : (
            <EmptyCart>Please add some products</EmptyCart>
          )}
        </WrapperDiv>
        {cart.length ? (
          <WrapperDiv>
            <Total>Total: {total} $</Total>
            <SubmitButton type="submit" value="Submit" />
          </WrapperDiv>
        ) : null}
      </Form>
    </Container>
  );
}
