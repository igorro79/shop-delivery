import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header
      style={{
        backgroundColor: "lightgrey",
        padding: "20px 40px",
      }}
    >
      <nav
        style={{
          fontWeight: "900",
        }}
      >
        <Link to="/">Home</Link> | <Link to="cart">Cart</Link>
      </nav>
    </header>
  );
}
