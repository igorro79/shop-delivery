import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCart } from "../../redux";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/cartList/CartList";
import { useState } from "react";
import { erase } from "../../redux/cart/cart-slice";
import operations from "../../redux/cart/cart-operations";
const Form = styled.form`
  font-size: 20px;
  width: 90%;
  padding: 50px 40px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;
const Credentials = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  // padding: 50px 40px;
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
  // display: inline-block;
  font-size: 30px;
  font-weight: 700;
  margin-left: auto;
  margin-right: 150px;
`;

const SubmitButton = styled.input`
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  background-color: orange;
  cursor: pointer;
  &:hover {
    background-color: gold;
  }
`;
export default function Cart() {
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();

  const orderDate = function () {
    const current = new Date(Date.now());
    return current.toLocaleDateString();
  };

  const total = cart.reduce(function (acc, next) {
    return acc + next.item.price * next.quantity;
  }, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      order: cart,
      sum: total,
      date: orderDate(),
    };
    console.log(order);
    // dispatch(operations.postOrder(order));
    // dispatch(erase);
  };

  // useEffect(() => {
  //   dispatch(erase());
  // }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <Credentials>
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
      </Wrapper>
      <Wrapper>
        <Total>Total: {total} $</Total>
        <SubmitButton type="submit" value="Submit" />
      </Wrapper>
    </Form>
  );
}
