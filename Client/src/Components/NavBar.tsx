import { Box, Icon, Input, Text, Link as ChakraLink } from "@chakra-ui/react";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
  const token = "";
  const [search, setSearch] = useState("");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      display="flex"
      alignItems="center"
      p="20px 150px"
      justifyContent="space-between"
      borderBottom="2px solid #E9E9E9"
    >
      <Box>
        <Text fontSize="25px" textShadow="0px 1px 2px black">
          Exclusive
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="40px">
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          color={isActive("/") ? "#DB4444" : "inherit"}
        >
          Home
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/contact"
          color={isActive("/contact") ? "#DB4444" : "inherit"}
        >
          Contact
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/about"
          color={isActive("/about") ? "#DB4444" : "inherit"}
        >
          About
        </ChakraLink>
        {token ? (
          <ChakraLink
            as={ReactRouterLink}
            to="/profile"
            color={isActive("/profile") ? "#DB4444" : "inherit"}
          >
            Profile
          </ChakraLink>
        ) : (
          <ChakraLink
            as={ReactRouterLink}
            to="/auth"
            color={isActive("/auth") ? "#DB4444" : "inherit"}
          >
            Signup
          </ChakraLink>
        )}
      </Box>
      <Box display="flex" alignItems="center" gap="20px">
        <Box
          display="flex"
          alignItems="center"
          bgColor="#EFEFEF"
          p="5px 15px"
          borderRadius="5px"
        >
          <Input
            variant="unstyled"
            placeholder="what are you looking for"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch fontSize="25px" />
        </Box>
        <Icon
          as={CiHeart}
          fontSize="25px"
          cursor="pointer"
          _hover={{ transform: "scale(1.1)", transition: "transform 0.2s ease-out" }}
        />
        <ChakraLink as={ReactRouterLink} to="/cart">
          <Icon
            as={CiShoppingCart}
            fontSize="25px"
            cursor="pointer"
            color={isActive("/cart") ? "#DB4444" : "inherit"}
            _hover={{ transform: "scale(1.1)", transition: "transform 0.2s ease-out" }}
          />
        </ChakraLink>
      </Box>
    </Box>
  );
};
