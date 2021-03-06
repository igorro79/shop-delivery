import React from "react";
import burger from "../../images/burger.jpg";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart, getShops } from "../../redux";

const List = styled.ul`
  display: grid;
  max-height: 420px;
  overflow-y: scroll;

  max-width: 700px;

  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: 10px;
`;
const ListItem = styled.li`
  width: 200px;
  margin: 0;
  padding: 0;
`;

const Thumb = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  height: 120px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;
const ProductTitle = styled.p`
  font-weight: 500;
  text-align: left;
  padding: 5px 10px;
  margin: 0;
`;
const Price = styled.p`
  font-weight: 700;
  text-align: left;

  margin: 0;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 25px;
  padding: 5px;
  border-radius: 5px;
  background-color: lightgreen;
  cursor: pointer;
`;

export default function ProductList({ onClick }) {
  const params = useParams();
  const { data } = useSelector(getShops);
  const { cart } = useSelector(getCart);

  const render = data.filter((item) => item.name === params.shop);

  return (
    data && (
      <>
        <List>
          {render[0].products.map((product) => (
            <ListItem key={product.name}>
              <Thumb to={product.name}>
                <Image src={burger} />
                <ProductTitle>{product.name}</ProductTitle>{" "}
                <Wrapper>
                  <Price>$ {product.price}</Price>
                  <Button
                    type="button"
                    onClick={() => onClick({ product, params, cart })}
                  >
                    Add
                  </Button>
                </Wrapper>
              </Thumb>
            </ListItem>
          ))}
        </List>
      </>
    )
  );
}
