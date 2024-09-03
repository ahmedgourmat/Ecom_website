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
import useCrud from "../../Hooks/useCrud";

interface CartItem {
  _id: number;
  product: any; // Replace with product type
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
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const cancelRef = useRef(null);
  const { get } = useCrud();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = JSON.parse(localStorage.getItem('products') || '[]');
        if (storedCartItems.length > 0) {
          // Fetch products based on IDs
          const productIds = storedCartItems.map((item: any) => item.product);
          // console.log('here is the fetch',productIds)
          // productIds.map(async(product: number) =>{
          //   return await get(`api/v1/product/${product._id}`)
          // }
          // );

          // console.log(productIds)

          // Create a mapping of product IDs to product data
          const productMap = productIds.reduce((acc: any, product: any) => {
            console.log('here is the second product_id',product._id)
            acc[product._id] = product;
            return acc;
          }, {});

          // Update cart items with full product data
          const updatedCartItems = storedCartItems.map((item: any) => {
            return ({
              ...item,
              product: productMap[item.product._id] || {},
            })
          });

          console.log('here is the updated cart item',updatedCartItems)
          setCartItems(updatedCartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      console.log('here is the handle prev',prevItems)
      console.log(id)
      const updatedItems = prevItems.map((item) =>
        item.product._id === id ? { ...item, quantity: newQuantity } : item
      );
      // Update local storage
      localStorage.setItem('products', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== id);
      // Update local storage
      localStorage.setItem('products', JSON.stringify(updatedItems));
      return updatedItems;
    });
    setIsOpen(false);
  };

  const confirmDelete = (id: number) => {
    setItemToDelete(id);
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
    console.log('here is the total',total)
    onSubtotalChange(total);
  }, [cartItems, onSubtotalChange]);

  const itemToDeleteName = cartItems.find(
    (item) => item._id === itemToDelete
  )?.product.name;

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
                  <Th>Color</Th>
                  <Th>Size</Th>
                  <Th isNumeric>Subtotal</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.product.nameP}</Td>
                    <Td>{item.product.price}$</Td>
                    <Td>
                      <QuantityCounter
                        quantity={item.quantity}
                        onChange={(newQuantity) =>
                          handleQuantityChange(item.product._id, newQuantity)
                        }
                      />
                    </Td>
                    <Td>{item.color}</Td>
                    <Td>{item.size}</Td>
                    <Td isNumeric>{getSubtotal(item.product.price, item.quantity)}$</Td>
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
                        onClick={() => confirmDelete(item._id)}
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
                  from your cart?
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
