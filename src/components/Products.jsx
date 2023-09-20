import { fetchProducts } from "../API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
} from "@chakra-ui/react";
import "../Products.css";
import SearchBar from "./SearchBar";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [query, setQuery] = useState({ search: "", results: [] });
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

  return (
    <>
      <SearchBar
        query={query}
        onSetQuery={setQuery}
        product={product}
        id="search-bar"
      />

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
