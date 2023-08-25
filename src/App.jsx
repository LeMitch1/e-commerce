import "./App.css";
import { fetchProducts } from "./API";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function ProductFetch() {
      try {
        const data = await fetchProducts();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    ProductFetch();
  }, []);

  return <></>;
}

export default App;
