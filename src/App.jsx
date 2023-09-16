import "./App.css";
import Products from "./components/Products";
import Login from "./components/Login";
import SingleProduct from "./components/SingleProduct";
import Profile from "./components/Profile";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./components/auth";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { RequireAuth } from "./components/RequireAuth";
import Cart from "./components/Cart";

function App() {
  // const [user, setUser] = useState(null);
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
