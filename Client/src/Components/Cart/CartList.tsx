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
  Select,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import QuantityCounter from "./QuantityCounter";
import useCrud from "../../Hooks/useCrud";

interface CartItem {
  _id: number;
  product: any;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface CartListProps {
  onSubtotalChange: (subtotal: number) => void;
}

export const CartList: React.FC<CartListProps> = ({ onSubtotalChange }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const cancelRef = useRef(null);
  const { get } = useCrud();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = JSON.parse(localStorage.getItem("products") || "[]");
        if (storedCartItems.length > 0) {
          const productIds = storedCartItems.map((item: any) => item.product);
          const products = await Promise.all(
            productIds.map(async (product: number) => {
              return await get(`api/v1/product/${product}`);
            })
          );

          const productMap = products.reduce((acc: any, product: any) => {
            acc[product._id] = product;
            return acc;
          }, {});

          // Update cart items with full product data
          const updatedCartItems = storedCartItems.map((item: any) => ({
            ...item,
            product: productMap[item.product] || {},
          }));

          setCartItems(updatedCartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const updateCartItem = (id: number, color: string, size: string, updatedFields: Partial<CartItem>) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.product._id === id && item.color === color && item.size === size
          ? { ...item, ...updatedFields }
          : item
      );

      // Update local storage
      const productData = updatedItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));
      localStorage.setItem("products", JSON.stringify(productData));

      return updatedItems;
    });
  };

  const handleQuantityChange = (id: number, color: string, size: string, newQuantity: number) => {
    updateCartItem(id, color, size, { quantity: newQuantity });
  };

  const handleSizeChange = (id: number, color: string, size: string, newSize: string) => {
    updateCartItem(id, color, size, { size: newSize });
  };

  const handleColorChange = (id: number, color: string, size: string, newColor: string) => {
    updateCartItem(id, color, size, { color: newColor });
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter(
          (item) => !(item.product._id === itemToDelete.product._id && item.color === itemToDelete.color && item.size === itemToDelete.size)
        );

        // Update local storage
        const productData = updatedItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        }));
        localStorage.setItem("products", JSON.stringify(productData));

        return updatedItems;
      });
      setIsOpen(false);
    }
  };

  const confirmDelete = (item: CartItem) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const getSubtotal = (price: number, quantity: number) => price * quantity;

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + getSubtotal(item.product.price, item.quantity),
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
        <Box display="flex" flexDirection="column" alignItems="center" gap="20px">
          <Text fontSize="32px" fontWeight="500" color="Black" textAlign="center">
            Your cart is empty.
          </Text>
          <Icon as={RiShoppingCartFill} boxSize="80px"></Icon>
        </Box>
      ) : (
        <>
          <TableContainer width="100%" height="250px" overflowY="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Color</Th>
                  <Th>Size</Th>
                  <Th isNumeric>Subtotal</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={`${item.product._id}-${item.color}-${item.size}`}>
                    <Td>{item.product.nameP}</Td>
                    <Td>{item.product.price}$</Td>
                    <Td>
                      <QuantityCounter
                        quantity={item.quantity}
                        onChange={(newQuantity) =>
                          handleQuantityChange(item.product._id, item.color, item.size, newQuantity)
                        }
                      />
                    </Td>
                    <Td>
                      <Select
                        value={item.color}
                        onChange={(e) =>
                          handleColorChange(item.product._id, item.color, item.size, e.target.value)
                        }
                      >
                        {item.product.colors.map((color: string) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td>
                      <Select
                        value={item.size}
                        onChange={(e) =>
                          handleSizeChange(item.product._id, item.color, item.size, e.target.value)
                        }
                      >
                        {item.product.sizes.map((size: string) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td isNumeric>{getSubtotal(item.product.price, item.quantity)}$</Td>
                    <Td isNumeric>
                      <IconButton
                        bg="#FFFFFF"
                        _hover={{ bg: "#FFFFFF" }}
                        aria-label="Delete item"
                        icon={
                          <Icon as={FaTrashAlt} color="#F53E4D" _hover={{ color: "#FD6C78" }} />
                        }
                        onClick={() =>
                          confirmDelete(item)
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Box display="flex" bg="white" pt="20px" width="100%" justifyContent="space-between">
            <Text fontSize="18px" fontWeight="500" color="black" borderBottom="1.5px solid black">
              Total:
            </Text>
            <Text fontSize="18px" fontWeight="500" color="black" borderBottom="1.5px solid black">
              {getTotal()}$
            </Text>
          </Box>
        </>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteItem} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CartList;
