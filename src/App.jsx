import "./App.css";
import Products from "./components/Products";
import Login from "./components/Login";
import SingleProduct from "./components/SingleProduct";
import Profile from "./components/Profile";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </>
  );
}

export default App;
