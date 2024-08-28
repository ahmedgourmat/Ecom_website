import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  Icon,
  Box,
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
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
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const cancelRef = useRef(null);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setIsOpen(false);
  };

  const confirmDelete = (id: number) => {
    setItemToDelete(id);
    setIsOpen(true);
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

  const itemToDeleteName = cartItems.find(
    (item) => item.id === itemToDelete
  )?.product;

  return (
    <Box display="flex" flexDirection="column" gap="30px" width="80%">
      {cartItems.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap="20px">
          <Text
            fontSize="32px"
            fontWeight="500"
            color="Black"
            textAlign="center"
          >
            Your cart is empty.
          </Text>
          <Icon as={RiShoppingCartFill} boxSize="80px"></Icon>
        </Box>
      ) : (
        <>
          <TableContainer
            width="100%"
            height="250px" // Fixed height for the table container
            overflowY="auto" // Make it scrollable
          >
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
                        onClick={() => confirmDelete(item.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Fixed Total Section */}
          <Box
            display="flex"
            bg="white"
            pt="20px"
            width="100%"
            justifyContent="space-between"
          >
            <Text
              fontSize="18px"
              fontWeight="500"
              color="black"
              borderBottom="1.5px solid black"
            >
              Total:
            </Text>
            <Text
              fontSize="18px"
              fontWeight="500"
              color="black"
              borderBottom="1.5px solid black"
            >
              {getTotal()}$
            </Text>
          </Box>

          <Box position="relative" py="20px">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Bill
            </AbsoluteCenter>
          </Box>

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

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete {itemToDeleteName}
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete{" "}
                  <Text as="span" fontWeight="600">
                    {itemToDeleteName}
                  </Text>{" "}
                  from your cart ?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteItem(itemToDelete!)}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </Box>
  );
};
