import React, { useEffect } from "react";
import { getAllCarts } from "../../redux";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import operations from "../../redux/cart/cart-operations";
import { Container } from "../../components/container/Container";
import { HistoryOrderItem } from "../../components/historyOrderItem/HistoryOrderItem";

const HistoryList = styled.ul`
  padding: 20px 0;
  max-height: 400px;
  overflow-y: scroll;
`;

export default function Cart() {
  const history = useSelector(getAllCarts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.fetchOrders());
  }, [dispatch]);

  return (
    <Container style={{ padding: "50px 40px" }}>
      {history.length ? (
        <HistoryList>
          {history.map((item) => (
            <HistoryOrderItem
              key={history.indexOf(item)}
              shop={item.shop}
              goods={item.order}
              date={item.createdAt}
              sum={item.sum}
              address={item.address}
            />
          ))}
        </HistoryList>
      ) : (
        <h2>Make some orders!</h2>
      )}
    </Container>
  );
}
