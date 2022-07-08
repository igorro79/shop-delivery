import { Link } from "react-router-dom";
import { Container } from "../container/Container";

export default function Home() {
  return (
    <header
      style={{
        backgroundColor: "lightgrey",
      }}
    >
      <Container>
        <nav
          style={{
            fontWeight: "900",
            padding: "20px 40px",
          }}
        >
          <Link to="/">Home</Link> | <Link to="cart">Cart</Link>
        </nav>
      </Container>
    </header>
  );
}
