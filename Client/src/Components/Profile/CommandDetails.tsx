import { Box, Button, Text, VStack, HStack, Image } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


export const CommandDetails = () => {
    const { state } = useLocation(); // Retrieve the passed state
    const [command, setCommand] = useState(state.command || {}); // Use state.command if available
    const { confirm, user, products, totalPrice } = command;

    const confirmButton = confirm ? (
        <Button colorScheme="green">Confirmed</Button>
    ) : (
        <Button colorScheme="red">Not Confirmed</Button>
    );

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="30px"
            overflowY="scroll"
        >
            {/* Product Info Section */}
            <VStack align="flex-start" spacing={4} bg="white" p={5} borderRadius="md" boxShadow="base">
                <Text fontSize="lg" fontWeight="bold">Products</Text>
                {products?.map((productItem: any) => (
                    <Box key={productItem._id} p={4} border="1px solid #e2e8f0" borderRadius="md" w="100%">
                        <HStack spacing={4}>
                            <Image
                                boxSize="200px"
                                src={productItem.product.img}
                                alt={productItem.product.nameP}
                                objectFit="cover"
                                borderRadius="md"
                            />
                            <VStack align="flex-start" spacing={2}>
                                <Text fontWeight="bold">{productItem.product.nameP}</Text>
                                <Text w='700px' >Description: {productItem.product.desc}</Text>
                                <Text>Price: {productItem.product.price} DA</Text>
                                <Text>Color: {productItem.color}</Text>
                                <Text>Size: {productItem.size}</Text>
                                <Text>Quantity: {productItem.quantity}</Text>
                            </VStack>
                        </HStack>
                    </Box>
                ))}
            </VStack>
            <HStack justifyContent="space-between" w="100%" p={5} bg="white" borderRadius="md" boxShadow="base">
                <Text fontWeight="bold" fontSize="lg">Total Price: {totalPrice} DA</Text>
                <HStack spacing={4}>
                    {confirmButton}
                    <Button colorScheme="blue">Update Command</Button>
                </HStack>
            </HStack>
        </Box>
    );
};