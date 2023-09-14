import "./App.css";
import Products from "./components/Products";
import Register from "./components/Register";
import SingleProduct from "./components/SingleProduct";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
