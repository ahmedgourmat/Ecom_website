import { Box, Button, Input, Link, Text } from "@chakra-ui/react";
import google_logo from "../../Assets/logo-google.svg";

interface SignupProps {
  onToggle: () => void;
}

export const Signup = ({ onToggle }: SignupProps) => {
  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Text fontWeight="500" fontSize="36px">
          Create an account
        </Text>
        <Text fontWeight="400" fontSize="16px">
          Enter your details below
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="30px">
        <Input
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Name"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Input
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Email or Phone Number"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Input
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Password"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="20px"
          mt="20px"
        >
          <Button
            bg="#DB4444"
            color="#FAFAFA"
            borderRadius="4px"
            w="100%"
            h="46px"
            fontWeight="400"
            _hover={{ bg: "#C23333" }}
            _focus={{
              bg: "#DB4444",
              boxShadow: "none",
            }}
          >
            Create Account
          </Button>
          <Button
            bg="#FFFFFF"
            color="#000000"
            borderRadius="4px"
            w="100%"
            h="46px"
            fontWeight="400"
            border="1px solid #323232"
            _hover={{ bg: "#F0F0F0" }}
            _focus={{
              bg: "#FFFFFF",
              boxShadow: "none",
            }}
          >
            <Box display="flex" alignItems="center" gap="10px">
              <img
                src={google_logo}
                alt="Google logo"
                style={{ height: "20px" }}
              />
              <Text>Sign up with Google</Text>
            </Box>
          </Button>
          <Text opacity="70%" textAlign="center">
            Already have an account?{" "}
            <Link
              fontWeight="500"
              color="#DB4444"
              _hover={{ textDecoration: "underline" }}
              onClick={onToggle}
            >
              Log in
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
