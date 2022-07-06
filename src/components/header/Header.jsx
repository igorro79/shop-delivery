import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header>
      <nav>
        <Link to="/home">Home</Link> | <Link to="cart">Cart</Link>
      </nav>
    </header>
  );
}
