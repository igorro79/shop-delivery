import React, { useState } from "react";
import { getCart } from "../../redux";
import styled from "styled-components";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/cartList/CartList";
import { erase } from "../../redux/cart/cart-slice";
import operations from "../../redux/cart/cart-operations";
import { Container } from "../../components/container/Container";
// import { Map } from "../../components/map/Map";

const Form = styled.form`
  font-size: 20px;
  width: 90%;
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

export default function Cart() {
  // const center = { lat: 50.44988346087649, lng: 30.50705691859317 };
  // const zoom = 9;

  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();

  const total = cart.reduce(function (acc, next) {
    return acc + next.item.price * next.quantity;
  }, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const newData = cart.map((product) =>
    Object.create(
      {},
      {
        name: { value: product.item.name },
        price: { value: product.item.price },
        quantity: { value: product.quantity },
      }
    )
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      shop: cart[0].shop,
      order: newData,
      sum: total,
    };
    dispatch(operations.postOrder(newOrder));
    alert("You order has been added. ");
    dispatch(erase());
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <WrapperDiv>
          <Credentials>
            {/* <Wrapper
              apiKey={process.env.GOOGLE_API_KEY}
                         >
              <Map center={center} zoom={zoom} />
            </Wrapper> */}

            <label htmlFor="name">First name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone:</label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="address">address:</label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Credentials>
          {cart.length ? (
            <CartList cartList={cart} />
          ) : (
            <li
              style={{
                fontSize: "30px",
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Please add some products
            </li>
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
