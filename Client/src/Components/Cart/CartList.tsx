import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
  Icon,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import QuantityCounter from "./QuantityCounter";

interface CartItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
}

interface CartListProps {
  onSubtotalChange: (subtotal: number) => void;
}

export const CartList: React.FC<CartListProps> = ({ onSubtotalChange }) => {
  const initialCartItems: CartItem[] = [
    { id: 1, product: "Iphone", price: 1000, quantity: 1 },
    { id: 2, product: "Mac", price: 2000, quantity: 1 },
    { id: 3, product: "Shoes", price: 150, quantity: 1 },
    { id: 4, product: "Jeans", price: 80, quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getSubtotal = (price: number, quantity: number) => price * quantity;

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + getSubtotal(item.price, item.quantity),
      0
    );
  };

  useEffect(() => {
    const total = getTotal();
    onSubtotalChange(total);
  }, [cartItems, onSubtotalChange]);

  return (
    <Box display="flex" flexDirection="column" gap="30px" width="80%">
      {cartItems.length === 0 ? (
        <Text fontSize="28px" fontWeight="500" color="Black" textAlign="center">
          Your cart is empty.
        </Text>
      ) : (
        <>
          <TableContainer width="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th isNumeric>Subtotal</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.product}</Td>
                    <Td>{item.price}$</Td>
                    <Td>
                      <QuantityCounter
                        quantity={item.quantity}
                        onChange={(newQuantity) =>
                          handleQuantityChange(item.id, newQuantity)
                        }
                      />
                    </Td>
                    <Td isNumeric>{getSubtotal(item.price, item.quantity)}$</Td>
                    <Td isNumeric>
                      <IconButton
                        bg="#FFFFFF"
                        _hover={{ bg: "#FFFFFF" }}
                        aria-label="Delete item"
                        icon={
                          <Icon
                            as={FaTrashAlt}
                            color="#F53E4D"
                            _hover={{ color: "#FD6C78" }}
                          />
                        }
                        onClick={() => handleDeleteItem(item.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th color="black" fontWeight="500" fontSize="18px">
                    Total
                  </Th>
                  <Th></Th>
                  <Th></Th>
                  <Th color="black" fontWeight="500" fontSize="18px" isNumeric>
                    {getTotal()}$
                  </Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="space-between">
            <Button
              border="1px solid grey"
              borderRadius="4px"
              fontSize="14px"
              px="30px"
              bg="#FFFFFF"
            >
              Return To Shop
            </Button>
            <Button
              border="1px solid grey"
              borderRadius="4px"
              fontSize="14px"
              px="30px"
              bg="#FFFFFF"
            >
              Update Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
