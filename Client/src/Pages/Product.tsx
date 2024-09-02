import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Text,
  HStack,
  Icon,
  Button,
  Input,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { FaTruck, FaUndo } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react';
import useCrud from '../Hooks/useCrud';


interface Product {
  _id: string;
  img: string;
  nameP: string;
  reviews: number;
  quantity: number;
  price: number;
  desc: string;
  colors: string[];
  sizes: string[];
}

export const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>({});
  const { get } = useCrud();

  useEffect(() => {
    // Introduce a delay to ensure the page has fully rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Smooth scroll for better UX
      });
    }, 100); // Adjust the delay if needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const productData = await get(`api/v1/product/${id}`);
        console.log(productData)
        setProduct(productData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);

  return (
    <Flex justifyContent='center' gap="40px" padding="20px">
      <Box>
        {loading ? (
          <Skeleton boxSize="400px" />
        ) : (
          <Image src={product.img} alt="Main Product" boxSize="400px" />
        )}
      </Box>
      <Box w='50%'>
        {loading ? (
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold">
              {product.nameP}
            </Text>
            <HStack spacing="2px" mt="2">
              <StarIcon color="yellow.400" />
              <StarIcon color="yellow.400" />
              <StarIcon color="yellow.400" />
              <StarIcon color="yellow.400" />
              <StarIcon color="gray.300" />
              <Text fontSize="sm" color="gray.600">
                ({product.reviews} Reviews)
              </Text>
            </HStack>
            <Text color="green.500" fontWeight="bold" mt="1">
              {product.quantity !== 0 ? "In Stock" : "Out of Stock"}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mt="2">
              ${product.price}
            </Text>
            <Text color="gray.600" mt="2">
              {product.desc}
            </Text>

            {/* Colors */}
            <Text fontWeight="bold" mt="4">Colours:</Text>
            <HStack spacing="5px">
              {(product.colors ?? []).map((color: string) => (
                <Box key={color} boxSize="20px" bg={color} borderRadius="50%" border={color === 'white' ? '1px solid black' : 'none'} />
              ))}
            </HStack>

            {/* Sizes */}
            <Text fontWeight="bold" mt="4">Size:</Text>
            <HStack spacing="10px">
              {(product.sizes ?? []).map((size: string) => (
                <Button key={size} size="sm" variant="outline">
                  {size}
                </Button>
              ))}
            </HStack>

            {/* Quantity Selector */}
            <HStack spacing="10px" mt="4">
              <Button>-</Button>
              <Input value="2" width="50px" textAlign="center" />
              <Button>+</Button>
              <Button colorScheme="red">Buy Now</Button>
            </HStack>

            <Divider my="4" />

            {/* Delivery Options */}
            <HStack spacing="10px">
              <Icon as={FaTruck} />
              <Box>
                <Text fontWeight="bold">Free Delivery</Text>
                <Text fontSize="sm" color="gray.600">
                  Enter your postal code for Delivery Availability
                </Text>
              </Box>
            </HStack>
            <HStack spacing="10px" mt="2">
              <Icon as={FaUndo} />
              <Box>
                <Text fontWeight="bold">Return Delivery</Text>
                <Text fontSize="sm" color="gray.600">
                  Free 30 Days Delivery Returns. Details
                </Text>
              </Box>
            </HStack>
          </>
        )}
      </Box>
    </Flex>
  );
};
