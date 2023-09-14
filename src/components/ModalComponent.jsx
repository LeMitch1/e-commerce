import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../API";

export default function ModalComponent(productId) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState([]);

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
  }, [setProduct, productId]);

  return (
    <>
      <Button onClick={onOpen}>Details</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu
              urna in arcu venenatis placerat. Nulla dictum dapibus vestibulum.
              Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Ut ligula ante, congue quis ullamcorper
              sed, pharetra id ante. Integer id porttitor tellus, ut cursus
              nulla. Nam in sem sagittis, mollis enim sit amet, condimentum
              diam. Fusce quis mi eu sapien vulputate viverra. Sed mollis tempus
              sapien, sed laoreet nisi fermentum mollis. Sed sit amet tortor
              turpis. Fusce sagittis tortor quam, et iaculis lorem consectetur
              ut. Quisque pellentesque ultrices elementum. Quisque gravida
              sodales nunc nec lobortis. Maecenas sagittis leo eu lacus
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
