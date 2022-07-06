import React from "react";
import burger from "../../images/burger.jpg";
import styled from "styled-components";

const List = styled.ul`
  display: grid;
  width: 70vw;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: 20px;
`;

const Thumb = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 200px;
  //   height: 200px;
`;
const Image = styled.img`
  width: 200px;
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

export default function ProductList({ products, onClick }) {
  return (
    <>
      <List>
        {products.map((product) => (
          <li key={product.id}>
            <Thumb to={product.name}>
              <Image src={burger} />
              <ProductTitle>{product.name}</ProductTitle>{" "}
              <Wrapper>
                <Price>$ {product.price}</Price>
                <Button type="button" onClick={onClick}>
                  Add
                </Button>
              </Wrapper>
            </Thumb>
          </li>
        ))}
      </List>
    </>
  );
}
