import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import ShopList from "../../components/shopList/ShopList";

const Wrapper = styled.div`
  display: flex;
  padding: 50px 40px;
`;
const Left = styled.div``;
const Right = styled.div`
  flex-grow: auto;
`;
// const handleClick = function () {
//   console.log();
// };

export default function Home({ shopList }) {
  return (
    <Wrapper>
      <Left>
        <ShopList shopList={shopList} />
      </Left>
      <Right>
        <Outlet />
      </Right>
    </Wrapper>
  );
}
