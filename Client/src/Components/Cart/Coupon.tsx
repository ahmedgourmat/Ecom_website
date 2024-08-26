import { Box, Button, Input } from "@chakra-ui/react";

export const Coupon = () => {
  return (
    <Box display="flex" gap="10px">
      <Input
        placeholder="Coupon Code"
        border="1px solid black"
        borderRadius="4px"
        w="250px"
        _focus={{
          border: "1.5px solid #DB4444",
          boxShadow: "none",
        }}
      ></Input>
      <Button
        bg="#DB4444"
        color="#FAFAFA"
        borderRadius="4px"
        px="30px"
        _hover={{ bg: "#C23333" }}
        _focus={{
          bg: "#DB4444",
          boxShadow: "none",
        }}
      >
        Apply Coupon
      </Button>
    </Box>
  );
};
