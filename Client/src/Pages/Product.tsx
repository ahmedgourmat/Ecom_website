import {
  Box,
  Flex,
  Image,
  Text,
  HStack,
  Icon,
  Button,
  VStack,
  Input,
  Divider,
} from "@chakra-ui/react";
import { FaTruck, FaUndo } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";

export const Product = () => {
  return (
    <Flex justifyContent='center' gap="40px" padding="20px">
      <Box>
        <Image src="https://via.placeholder.com/400" alt="Main Product" boxSize="400px" />
      </Box>
      <Box
        w='50%'
      >
        <Text fontSize="2xl" fontWeight="bold">
          Havic HV G-92 Gamepad
        </Text>
        <HStack spacing="2px" mt="2">
          <StarIcon color="yellow.400" />
          <StarIcon color="yellow.400" />
          <StarIcon color="yellow.400" />
          <StarIcon color="yellow.400" />
          <StarIcon color="gray.300" />
          <Text fontSize="sm" color="gray.600">
            (150 Reviews)
          </Text>
        </HStack>
        <Text color="green.500" fontWeight="bold" mt="1">
          In Stock
        </Text>
        <Text fontSize="2xl" fontWeight="bold" mt="2">
          $192.00
        </Text>
        <Text color="gray.600" mt="2">
          PlayStation 5 Controller Skin High-quality vinyl with air channel adhesive
          for easy bubble-free install & mess-free removal. Pressure sensitive.
        </Text>

        {/* Colors */}
        <Text fontWeight="bold" mt="4">
          Colours:
        </Text>
        <HStack spacing="5px">
          <Box boxSize="20px" bg="red.500" borderRadius="50%" />
          <Box boxSize="20px" bg="black" borderRadius="50%" />
        </HStack>

        {/* Sizes */}
        <Text fontWeight="bold" mt="4">
          Size:
        </Text>
        <HStack spacing="10px">
          {["XS", "S", "M", "L", "XL"].map((size) => (
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
      </Box>
    </Flex>
  );
};
