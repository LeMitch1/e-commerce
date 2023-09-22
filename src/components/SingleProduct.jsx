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
  Spinner,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
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
        setIsFetching(false);
      } catch (err) {
        console.log(err);
      }
    }
    SingleProductFetch();
  }, [productId]);

  return (
    <>
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
        <Card maxW="sm" key={product.id} margin={6}>
          <CardBody>
            <Image src={product.image} alt={product.title} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.title}</Heading>
              <Text>{product.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                {USDollar.format(product.price)}
              </Text>
              <Text>
                {product.rating?.rate}
                <FontAwesomeIcon icon={faStar} />
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
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
