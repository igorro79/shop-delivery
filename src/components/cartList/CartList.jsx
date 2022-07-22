import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeQuantity, removeById } from "../../redux/cart/cart-slice";

import burger from "../../images/burger.jpg";

const List = styled.ul`
  display: flex;
  max-height: 500px;
  overflow-y: auto;
  flex-direction: column;
  align-items: stretch;
  width: 600px;
  color: black;
  padding: 30px 20px;
  border: 3px solid silver;
  border-radius: 5px;
  & :not(:last-child) {
    margin-bottom: 20px;
  }
`;
const ListItem = styled.li`
  position: relative;
  display: flex;

  padding: 30px 20px;
  border: 1px solid silver;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;
const Image = styled.img`
  width: 100%;
  height: 120px;
  margin-right: 20px;
`;

const ProductTitle = styled.p`
  font-weight: 700;
  text-align: left;

  margin: 0;
`;
const Price = styled.p`
  font-weight: 900;
  text-align: left;

  margin: 0;
`;
const Input = styled.input`
  width: 80px;
  font-size: 20px;

  padding: 10px;
`;
const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background-color: silver;
  cursor: pointer;
  &:hover,
  &:active {
    color: #fff;
    background-color: #8a202e;
  }
`;

export default function CartList({ cartList }) {
  const dispatch = useDispatch();

  return (
    <List>
      {cartList.map((item) => (
        <ListItem key={item.item.name}>
          <Image src={burger} />
          <TextWrapper>
            <ProductTitle>{item.item.name}</ProductTitle>
            <Price>Price: {item.item.price} $</Price>
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  changeQuantity({ itemId: item.id, newValue: e.target.value })
                )
              }
            />
          </TextWrapper>
          <RemoveButton
            type="button"
            onClick={() => dispatch(removeById(item.id))}
          >
            X
          </RemoveButton>
        </ListItem>
      ))}
    </List>
  );
}
