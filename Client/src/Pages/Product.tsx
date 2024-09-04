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
  useToast
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { get } = useCrud();
  const toast = useToast();

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
        setProduct(productData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Selection Missing",
        description: "Please select both color and size.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const cartItem = {
      product: id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    };

    // Get existing cart from local storage or initialize it
    const existingCart = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Check if the product already exists in the cart
    const existingProductIndex = existingCart.findIndex((item: any) =>
      item.product === id && item.color === selectedColor && item.size === selectedSize
    );

    if (existingProductIndex > -1) {
      // Update the quantity if product exists
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      existingCart.push(cartItem);
    }

    // Save updated cart to local storage
    localStorage.setItem('products', JSON.stringify(existingCart));

    toast({
      title: "Added to Cart",
      description: "The product has been added to your cart.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex justifyContent='center' gap="40px" padding="20px">
      <Box>
        {loading ? (
          <Skeleton boxSize="400px" />
        ) : (
          <Image src={product.img || 'https://via.placeholder.com/400'} alt="Main Product" boxSize="400px" />
        )}
      </Box>
      <Box w='50%'>
        {loading ? (
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold">
              {product.nameP || 'Product Name'}
            </Text>
            <HStack spacing="2px" mt="2">
              <StarIcon color="yellow.400" />
              <StarIcon color="yellow.400" />
              <StarIcon color="yellow.400" />
              <StarIcon color="yellow.400" />
              <StarIcon color="gray.300" />
              <Text fontSize="sm" color="gray.600">
                ({product.reviews || 0} Reviews)
              </Text>
            </HStack>
            <Text color="green.500" fontWeight="bold" mt="1">
              {product.quantity !== 0 ? "In Stock" : "Out of Stock"}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mt="2">
              ${product.price || '0.00'}
            </Text>
            <Text color="gray.600" mt="2">
              {product.desc || 'Product Description'}
            </Text>

            {/* Colors */}
            <Text fontWeight="bold" mt="4">Colours:</Text>
            <HStack spacing="5px">
              {(product.colors ?? []).map((color: string) => (
                <Box
                  key={color}
                  boxSize="20px"
                  bg={color}
                  borderRadius="50%"
                  border='1px solid black'
                  onClick={() => setSelectedColor(color)}
                  cursor="pointer"
                  borderColor={selectedColor === color ? 'blue.500' : 'black'}
                />
              ))}
            </HStack>

            {/* Sizes */}
            <Text fontWeight="bold" mt="4">Size:</Text>
            <HStack spacing="10px">
              {(product.sizes ?? []).map((size: string) => (
                <Button
                  key={size}
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedSize(size)}
                  borderColor={selectedSize === size ? 'blue.500' : 'transparent'}
                >
                  {size}
                </Button>
              ))}
            </HStack>

            {/* Quantity Selector */}
            <HStack spacing="10px" mt="4">
              <Button onClick={() => setQuantity(q => Math.max(q - 1, 1))}>-</Button>
              <Input
                value={quantity}
                width="50px"
                textAlign="center"
                readOnly
              />
              <Button onClick={() => setQuantity(q => q + 1)}>+</Button>
              <Button colorScheme="red" onClick={handleAddToCart}>Buy Now</Button>
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
