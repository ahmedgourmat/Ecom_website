import { Box, Flex , Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Product = {
    _id : string
    nameP : string 
    img : string 
}


export const ProductItem:React.FC<{product : Product}> = ({product})=>{
    return (
        <Link to={`/product/${product._id}`} key={product._id} style={{ width: '270px', flex: '0 0 auto' }}>
            <Box
                textAlign="center"
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                minH="350px"
                bg="white"
                position="relative"
                overflow="hidden"
                _hover={{
                    '.cart-text': {
                        transform: 'translateY(0)',
                        opacity: 1
                    }
                }}
                gap="10px"
            >
                <Box position="relative" h="220px" display="flex" justifyContent="center" backgroundColor="#F5F5F5" alignSelf="center" w="100%">
                    <Image mixBlendMode="multiply" src={product.img} alt={product.nameP} borderRadius="md" h="100%" w="100%" />
                    <Text
                        className="cart-text"
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        textAlign="center"
                        bgColor="#0E0E0E"
                        color="white"
                        padding="10px"
                        transform="translateY(100%)"
                        opacity="0"
                        transition="transform 0.3s ease, opacity 0.3s ease"
                    >
                        See more details
                    </Text>
                </Box>
                <Text fontWeight="bold" mt="2">{product.nameP}</Text>
            </Box>
        </Link>
    )
}
