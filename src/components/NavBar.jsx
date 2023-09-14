import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/register">
        <p>Register</p>
      </Link>
      <Link to="/view-product">
        <p>View Product</p>
      </Link>
    </header>
  );
}
