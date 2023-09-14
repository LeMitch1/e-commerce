import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleProduct } from "../API";
import {
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function SingleProductFetch() {
      try {
        const data = await fetchSingleProduct(productId);
        console.log(data);
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    }
    SingleProductFetch();
  }, [productId]);

  return (
    <>
      {product && (
        <Card
          maxW="sm"
          key={product.id}
          margin={6}
          // bgGradient="linear(to-t, green.200, pink.500)"
        >
          <CardBody>
            <Image src={product.image} alt={product.title} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.title}</Heading>
              <Text>{product.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                {USDollar.format(product.price)}
              </Text>
              <Text>{product.rating?.rate}⭐️</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              {/* <Button variant="solid" colorScheme="blue">
                Details
              </Button> */}
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => navigate("/products")}
              >
                Go Back
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
