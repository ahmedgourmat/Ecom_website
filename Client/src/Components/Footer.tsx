import { Box, Text, Input, Button, Link, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,FaLocationArrow } from "react-icons/fa"; // Importing icons

export const Footer = () => {
  return (
    <Box
      width="100%"
      bg="black"
      color="white"
      py="40px"
      px="40px"
    >
      <Box
        maxWidth="1200px"
        mx="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* Exclusive Section */}
        <VStack align="flex-start" spacing="20px" minWidth="200px">
          <Text fontWeight="bold" fontSize="24px">
            Exclusive
          </Text>
          <Text fontSize="16px" fontWeight="600">Subscribe</Text>
          <Text fontSize="14px" color="gray.400">
            Get 10% off your first order
          </Text>
          <HStack spacing="0">
            <Input
              placeholder="Enter your email"
              borderRadius="0"
              bg="white"
              color="black"
              height="35px"
              width="200px"
            />
            <Button
              borderRadius="0"
              bg="white"
              color="black"
              height="35px"
              px="10px"
            >
              <Icon as={FaLocationArrow} />
            </Button>
          </HStack>
        </VStack>

        {/* Support Section */}
        <VStack align="flex-start" spacing="10px" minWidth="200px">
          <Text fontWeight="bold" fontSize="16px">
            Support
          </Text>
          <Text fontSize="14px" color="gray.400">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </Text>
          <Link href="mailto:exclusive@gmail.com" fontSize="14px" color="gray.400">
            exclusive@gmail.com
          </Link>
          <Text fontSize="14px" color="gray.400">
            +88015-88888-9999
          </Text>
        </VStack>

        {/* Account Section */}
        <VStack align="flex-start" spacing="10px" minWidth="200px">
          <Text fontWeight="bold" fontSize="16px">
            Account
          </Text>
          <Link href="#" fontSize="14px" color="gray.400">
            My Account
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            Login / Register
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            Cart
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            Wishlist
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            Shop
          </Link>
        </VStack>

        {/* Quick Links Section */}
        <VStack align="flex-start" spacing="10px" minWidth="200px">
          <Text fontWeight="bold" fontSize="16px">
            Quick Link
          </Text>
          <Link href="#" fontSize="14px" color="gray.400">
            Privacy Policy
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            Terms Of Use
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            FAQ
          </Link>
          <Link href="#" fontSize="14px" color="gray.400">
            Contact
          </Link>
        </VStack>

        {/* Download App Section */}
        <VStack align="flex-start" spacing="20px" minWidth="200px">
          
          <HStack spacing="15px" pt="10px">
            <Link href="#">
              <Icon as={FaFacebookF} boxSize={4} />
            </Link>
            <Link href="#">
              <Icon as={FaTwitter} boxSize={4} />
            </Link>
            <Link href="#">
              <Icon as={FaInstagram} boxSize={4} />
            </Link>
            <Link href="#">
              <Icon as={FaLinkedinIn} boxSize={4} />
            </Link>
          </HStack>
        </VStack>
      </Box>

      <Box
        mt="50px"
        borderTop="1px solid #333"
        pt="20px"
        textAlign="center"
        color="gray.500"
      >
        &copy; Copyright Ahmed&Raouf 2024. All rights reserved
      </Box>
    </Box>
  );
};
