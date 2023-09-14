import { fetchProducts } from "../API";
import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import "../Products.css";
import SingleProduct from "./SingleProduct";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    async function ProductFetch() {
      try {
        const data = await fetchProducts();
        setProduct(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    ProductFetch();
  }, []);

  function handleDetailsClick() {
    setShowDetails(!showDetails);
  }

  return (
    <div className="Products">
      {product.map((i) => (
        <Card
          maxW="sm"
          key={i.id}
          margin={6}
          // bgGradient="linear(to-t, green.200, pink.500)"
        >
          <CardBody>
            <Image src={i.image} alt={i.title} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              {i.title.length > 15 ? (
                <Heading size="md">{i.title.slice(0, 15)}...</Heading>
              ) : (
                <Heading size="md">{i.title}</Heading>
              )}
              {/* <Text>{i.description}</Text> */}
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
                onClick={handleDetailsClick}
              >
                Details {showDetails && <SingleProduct />}
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
