import { Box, Button, Input, Text, Link } from "@chakra-ui/react";

interface LoginProps {
  onToggle: () => void;
}

export const Login = ({ onToggle }: LoginProps) => {
  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Text fontWeight="500" fontSize="36px">
          Login to Exclusive
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
          type="password"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            bg="#DB4444"
            color="#FAFAFA"
            borderRadius="4px"
            w="140px"
            h="46px"
            _hover={{ bg: "#C23333" }}
            _focus={{
              bg: "#DB4444",
              boxShadow: "none",
            }}
          >
            Log in
          </Button>
          <Link
            color="#DB4444"
            fontWeight="500"
            _hover={{ textDecoration: "underline" }}
          >
            Forgot Password?
          </Link>
        </Box>
        <Text opacity="70%" textAlign="center" mt="20px">
          Don't have an account?{" "}
          <Link
            fontWeight="500"
            color="#DB4444"
            _hover={{ textDecoration: "underline" }}
            onClick={onToggle}
          >
            Sign up
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
