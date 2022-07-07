import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const List = styled.ul`
  display: flex;

  flex-direction: column;
  align-items: stretch;
  width: 200px;
  color: black;
  padding: 30px 20px;
  border: 3px solid silver;
  border-radius: 5px;
  & :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const CustomLink = styled(NavLink)`
  display: flex;
  font-size: 24px;
  background-color: #fafafa;
  color: inherit;
  box-shadow: 2px 2px 5px 1px;
  padding: 10px 20px;
  border: 2px solid silver;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: grey;
    color: #fff;
  }
  &.active {
    background-color: green;
    color: #fff;
  }
  &: visited {
    &:hover {
      background-color: grey;
      color: #fff;
    }
  }
`;

export default function ShopList({ shopList }) {
  return (
    <List>
      {shopList.map((shop) => (
        <li key={shop.id}>
          <CustomLink to={shop.name}>{shop.name}</CustomLink>
        </li>
      ))}
    </List>
  );
}
