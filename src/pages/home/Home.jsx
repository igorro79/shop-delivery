import React from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../components/container/Container";
import ShopList from "../../components/shopList/ShopList";

const Wrapper = styled.div`
  display: flex;
  padding: 50px 40px;
`;
const Left = styled.div``;
const Right = styled.div``;

export default function Home({ shopList }) {
  //===========disable links after choosing one==========
  const params = useParams();
  const links = document.querySelectorAll(`[data-name]`);
  params.hasOwnProperty("shop")
    ? links.forEach((link) =>
        link.classList.contains("active")
          ? null
          : link.classList.add("disabled")
      )
    : links.forEach((link) => link.classList.remove("disabled"));

  return (
    <Container>
      <Wrapper>
        <Left>
          <ShopList shopList={shopList} />
        </Left>
        <Right>
          <Outlet />
        </Right>
      </Wrapper>
    </Container>
  );
}
