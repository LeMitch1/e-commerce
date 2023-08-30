import "./App.css";
import Products from "./components/Products";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
