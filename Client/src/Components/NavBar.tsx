import {
  Box,
  Icon,
  Input,
  Text,
  Button,
  Link as ChakraLink,
  keyframes,
} from "@chakra-ui/react";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { UserState } from "../Hooks/useLogin";

export const NavBar: React.FC = () => {
  const { token } = UserState();
  const [search, setSearch] = useState<string>("");
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  const colorCycle = keyframes`
    0% { background-color: #DB4444; box-shadow: 0 0 5px #DB4444; }
    25% { background-color: #E57373; box-shadow: 0 0 10px #E57373; }
    50% { background-color: #F44336; box-shadow: 0 0 15px #F44336; }
    75% { background-color: #EF5350; box-shadow: 0 0 10px #EF5350; }
    100% { background-color: #DB4444; box-shadow: 0 0 5px #DB4444; }
  `;

  const buttonScale = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); }
  `;

  const isSignUpPage = location.pathname === "/auth";

  return (
    <Box
      display="flex"
      alignItems="center"
      p="20px 150px"
      justifyContent="space-between"
      borderBottom="2px solid #E9E9E9"
      w="100%"
      pos="fixed"
      zIndex="99999"
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      top="0px"
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
        {token && (
          <ChakraLink
            as={ReactRouterLink}
            to="/profile"
            color={isActive("/profile") ? "#DB4444" : "inherit"}
          >
            Profile
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
            placeholder="What are you looking for"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            borderRadius="6px"
          />
          <CiSearch fontSize="25px" />
        </Box>
        <ChakraLink as={ReactRouterLink} to="/saved">
          <Icon
            as={CiHeart}
            fontSize="25px"
            cursor="pointer"
            color={isActive("/saved") ? "#DB4444" : "inherit"}
            _hover={{
              transform: "scale(1.1)",
              transition: "transform 0.2s ease-out",
            }}
          />
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/cart">
          <Icon
            as={CiShoppingCart}
            fontSize="25px"
            cursor="pointer"
            color={isActive("/cart") ? "#DB4444" : "inherit"}
            _hover={{
              transform: "scale(1.1)",
              transition: "transform 0.2s ease-out",
            }}
          />
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
          <Button
            as={ReactRouterLink}
            to="/auth"
            variant="solid"
            size="sm"
            ml="20px"
            color={isSignUpPage ? "#DB4444" : "white"}
            borderRadius="6px"
            fontWeight="500"
            animation={
              !isSignUpPage
                ? `${colorCycle} 5s infinite, ${buttonScale} 2s infinite`
                : "none"
            }
            border={isSignUpPage ? "1px solid #DB4444" : "none"}
            bgColor={isSignUpPage ? "white" : "none"}
            sx={{
              animationPlayState: !isSignUpPage ? "running" : "paused",
              "&:hover": {
                transform: "scale(1.03)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                animationPlayState: "paused",
                background: "white",
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "none",
              },
            }}
          >
            Signup
          </Button>
        )}
      </Box>
    </Box>
  );
};
