import { fetchProducts } from "../API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Spinner,
  Select,
} from "@chakra-ui/react";
import "../Products.css";
import SearchBar from "./SearchBar";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [query, setQuery] = useState({ search: "", results: [] });
  const [sortType, setSortType] = useState("ascending");
  const [sortByField, setSortByField] = useState("title");
  const [result, setResult] = useState();
  const [state, setState] = useState({ query: "", list: product });
  const navigate = useNavigate();

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    async function ProductFetch() {
      try {
        const data = await fetchProducts();
        setProduct(data);
        setIsFetching(false);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    ProductFetch();
  }, []);

  function handleMapping(data) {
    return data.map((i) => (
      <Card maxW="sm" key={i.id} margin={6}>
        <CardBody>
          <Image
            src={i.image}
            alt={i.title}
            borderRadius="lg"
            className="Products"
          />
          <Stack mt="6" spacing="3">
            {i.title.length > 15 ? (
              <Heading size="md">{i.title.slice(0, 15)}...</Heading>
            ) : (
              <Heading size="md">{i.title}</Heading>
            )}
            <Text color="blue.600" fontSize="2xl">
              {USDollar.format(i.price)}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => navigate(`/products/${i.id}`)}
            >
              Details
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    ));
  }

  // Sort posts depending on sort type and available results
  function sortFunc(results, sortType, sortByField) {
    if (sortType === "ascending") {
      results.sort((a, b) => (a[sortByField] < b[sortByField] ? -1 : 1));
    } else if (sortType === "descending") {
      results.sort((a, b) => (b[sortByField] > a[sortByField] ? 1 : -1));
    } else if (sortType === "priceLowToHigh") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHighToLow") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortType === "bestSellers") {
      results.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortType === "original") {
      results.sort((a, b) => a.id - b.id);
    }
    return results;
  }

  // Dropdown to sort posts in ascending or descending order depending on title.
  function updatePosts(e) {
    setSortType(e);
    setState({
      query: state.query,
      list: !result
        ? sortFunc(product, e, sortByField)
        : sortFunc(result, e, sortByField),
    });
  }

  return (
    <>
      <Box display="flex">
        <SearchBar
          query={query}
          onSetQuery={setQuery}
          product={product}
          id="search-bar"
        />
        <Select
          size="sm"
          width="20vw"
          defaultValue={"DEFAULT"}
          onChange={(e) => updatePosts(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Sort Products
          </option>
          <option value="original">Default</option>
          <option value="bestSellers">Best Sellers</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </Select>
      </Box>

      {isFetching ? (
        <Stack
          paddingTop={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner boxSize="12em" size="xl" color="blue.500" thickness="4px" />
        </Stack>
      ) : (
        <section className="Products">
          {query.search === ""
            ? handleMapping(product)
            : handleMapping(query.results)}
        </section>
      )}
    </>
  );
}
