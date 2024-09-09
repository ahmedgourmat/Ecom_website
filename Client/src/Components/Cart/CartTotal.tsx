import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { UserState } from "../../Hooks/useLogin";
import useCrud from "../../Hooks/useCrud";

interface CartTotalProps {
  subtotal: number;
  shipping: number;
  total: number;
}

export const CartTotal: React.FC<CartTotalProps> = ({ subtotal, shipping, total }) => {
  const { token } = UserState() ?? {};
  const { post } = useCrud();
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // Using toast for user feedback

  const createCommand = async () => {
    setLoading(true);
    try {
      await post('api/v1/command', { products, delivery: 50 }, token);
      toast({
        title: "Success",
        description: "Command created successfully",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create command",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      width="400px"
      flexDirection="column"
      alignItems="center"
      gap="30px"
      border="1px solid black"
      borderRadius="4px"
      py="20px"
      px="10px"
    >
      <Text fontWeight="600" fontSize="18px" textAlign="right">
        Cart Total
      </Text>

      <Box display="flex" flexDirection="column" gap="20px" width="100%">
        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="400" fontSize="18px" textAlign="right">
            Subtotal:
          </Text>
          <Text fontSize="18px">${subtotal.toFixed(2)}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="400" fontSize="18px" textAlign="right">
            Shipping:
          </Text>
          <Text fontSize="18px">${shipping.toFixed(2)}</Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          borderTop="1px solid #E2E8F0"
          pt="10px"
        >
          <Text fontWeight="600" fontSize="20px" textAlign="right">
            Total:
          </Text>
          <Text fontWeight="600" fontSize="20px">
            ${total.toFixed(2)}
          </Text>
        </Box>
      </Box>
      <Button
        bg="#DB4444"
        color="#FAFAFA"
        fontSize="14px"
        fontWeight="400"
        width="250px"
        borderRadius="4px"
        _hover={{ bg: "#C23333" }}
        _focus={{
          bg: "#DB4444",
          boxShadow: "none",
        }}
        onClick={createCommand}
        isLoading={loading}
        loadingText="Processing..."
      >
        Command now
      </Button>
    </Box>
  );
};
