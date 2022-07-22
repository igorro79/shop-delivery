import styled from "styled-components";

const HistoryListItem = styled.li`
  width: 99%;
  padding: 10px 20px;
  border: 1px #000 solid;
  border-radius: 5px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  color: blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HistoryOrderItem = function ({ goods, shop, date, sum, address }) {
  const format = new Date(date);

  return (
    <HistoryListItem>
      <Header>
        <h3>{shop}</h3> <b> {format.toLocaleDateString()}</b>
      </Header>

      <ul style={{ marginBottom: "10px" }}>
        {goods.map((item) => {
          return (
            <li key={item.name} style={{ lineHeight: "2rem" }}>
              <span>{item.name} x </span>
              <b>{item.quantity}</b>
            </li>
          );
        })}
      </ul>
      <p>
        <b>Address:</b> {address}
      </p>
      <b style={{ color: "green" }}>Total cost: {sum} $</b>
    </HistoryListItem>
  );
};
