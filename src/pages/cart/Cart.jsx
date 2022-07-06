import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div>
      <h1>Cart</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="cart">Cart</Link>
      </nav>
    </div>
  );
}
