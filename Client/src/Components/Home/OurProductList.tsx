import { Box, Flex, IconButton, Image, Text, Button, HStack, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Ring from '../../assets/ring.jpg';
import batmanTshirt from '../../assets/batmanTshirt.jpg';
import Tshirt from '../../assets/Tshirt.jpg';
import watch from '../../assets/watch.jpg';
import shoe from '../../assets/shoe.jpg';

interface Product {
    id: number;
    name: string;
    discount: number;
    price: number;
    originalPrice: number;
    image: any;
    rating: number;
    reviews: number;
}

export const OurProductList = () => {
    const [likedProducts, setLikedProducts] = useState<number[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);

    const products: Product[] = [
        { id: 1, name: "HAVIT HV-G92 Gamepad", discount: 40, price: 120, originalPrice: 160, image: Ring, rating: 4.5, reviews: 88 },
        { id: 2, name: "AK-900 Wired Keyboard", discount: 35, price: 960, originalPrice: 1160, image: batmanTshirt, rating: 4, reviews: 75 },
        { id: 3, name: "IPS LCD Gaming Monitor", discount: 30, price: 370, originalPrice: 400, image: Tshirt, rating: 5, reviews: 99 },
        { id: 4, name: "S-Series Comfort Chair", discount: 25, price: 375, originalPrice: 400, image: watch, rating: 4.8, reviews: 99 },
        { id: 5, name: "Gaming Mouse", discount: 20, price: 50, originalPrice: 65, image: shoe, rating: 4.2, reviews: 150 },
        { id: 6, name: "HAVIT HV-G92 Gamepad", discount: 40, price: 120, originalPrice: 160, image: Ring, rating: 4.5, reviews: 88 },
        { id: 7, name: "AK-900 Wired Keyboard", discount: 35, price: 960, originalPrice: 1160, image: batmanTshirt, rating: 4, reviews: 75 },
        { id: 8, name: "IPS LCD Gaming Monitor", discount: 30, price: 370, originalPrice: 400, image: Tshirt, rating: 5, reviews: 99 },
        { id: 9, name: "S-Series Comfort Chair", discount: 25, price: 375, originalPrice: 400, image: watch, rating: 4.8, reviews: 99 },
        { id: 10, name: "Gaming Mouse", discount: 20, price: 50, originalPrice: 65, image: shoe, rating: 4.2, reviews: 150 },
        { id: 11, name: "HAVIT HV-G92 Gamepad", discount: 40, price: 120, originalPrice: 160, image: Ring, rating: 4.5, reviews: 88 },
        { id: 12, name: "AK-900 Wired Keyboard", discount: 35, price: 960, originalPrice: 1160, image: batmanTshirt, rating: 4, reviews: 75 },
        { id: 13, name: "IPS LCD Gaming Monitor", discount: 30, price: 370, originalPrice: 400, image: Tshirt, rating: 5, reviews: 99 },
        { id: 14, name: "S-Series Comfort Chair", discount: 25, price: 375, originalPrice: 400, image: watch, rating: 4.8, reviews: 99 },
        { id: 15, name: "Gaming Mouse", discount: 20, price: 50, originalPrice: 65, image: shoe, rating: 4.2, reviews: 150 }
    ];

    const toggleLike = (productId: number) => {
        setLikedProducts((prevLikedProducts) =>
            prevLikedProducts.includes(productId)
                ? prevLikedProducts.filter(id => id !== productId)
                : [...prevLikedProducts, productId]
        );
    };

    const loadMoreProducts = () => {
        setVisibleCount(prevCount =>
            prevCount + 8 > products.length ? products.length : prevCount + 8
        );
    };

    const renderStars = (rating: number) => {
        const filledStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <HStack spacing="1px">
                {[...Array(filledStars)].map((_, index) => (
                    <Icon key={index} as={StarIcon} color="yellow.400" />
                ))}
                {halfStar && <Icon as={StarIcon} color="yellow.400" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <Icon key={index} as={StarIcon} color="gray.300" />
                ))}
            </HStack>
        );
    };

    return (
        <Flex gap='40px' flexDir="column">
            <Flex width="100%" gap="25px" flexWrap="wrap" justifyContent="flex-start">
                {products.slice(0, visibleCount).map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} style={{ width: '270px', flex: '0 0 auto' }}>
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
                                <Image mixBlendMode="multiply" src={product.image} alt={product.name} borderRadius="md" h="100%" w="100%" />
                                <IconButton
                                    aria-label="Like Product"
                                    icon={<FaHeart color={likedProducts.includes(product.id) ? 'red' : 'gray'} size="25" />}
                                    onClick={() => toggleLike(product.id)}
                                    variant="ghost"
                                    position="absolute"
                                    top="10px"
                                    right="10px"
                                    _hover={{ backgroundColor: 'transparent' }}
                                />
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
                                    Add To Cart
                                </Text>
                            </Box>
                            <Text fontWeight="bold" mt="2">{product.name}</Text>
                            <Flex justifyContent="space-between" gap="5px" alignItems="center" mt="1">
                                <Text color="red.500" fontWeight="bold">${product.price}</Text>
                                <Text color="gray.500" textDecoration="line-through">${product.originalPrice}</Text>
                            </Flex>
                            <Box mt="2">
                                {renderStars(product.rating)}
                                <Text fontSize="sm" color="gray.600">({product.reviews} reviews)</Text>
                            </Box>
                        </Box>
                    </Link>
                ))}
            </Flex>
            {visibleCount < products.length && (
                <Button onClick={loadMoreProducts} p="10px 40px" color="white" bgColor="#DB4444" _hover={{ backgroundColor: '#DB4444' }} alignSelf="center">
                    View More Products
                </Button>
            )}
        </Flex>
    );
};
