import { FaArrowLeft, FaArrowRight, FaHeart } from 'react-icons/fa';
import { Box, Image, Text, Flex, IconButton, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons'; // Import StarIcon
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

export const BestSellingProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedProducts, setLikedProducts] = useState<number[]>([]);

    const products: Product[] = [
        { id: 1, name: "HAVIT HV-G92 Gamepad", discount: 40, price: 120, originalPrice: 160, image: Ring, rating: 4.5, reviews: 88 },
        { id: 2, name: "AK-900 Wired Keyboard", discount: 35, price: 960, originalPrice: 1160, image: batmanTshirt, rating: 4, reviews: 75 },
        { id: 3, name: "IPS LCD Gaming Monitor", discount: 30, price: 370, originalPrice: 400, image: Tshirt, rating: 5, reviews: 99 },
        { id: 4, name: "S-Series Comfort Chair", discount: 25, price: 375, originalPrice: 400, image: watch, rating: 4.8, reviews: 99 },
        { id: 5, name: "Gaming Mouse", discount: 20, price: 50, originalPrice: 65, image: shoe, rating: 4.2, reviews: 150 },
    ];

    const productsToShow = 4; // Number of products to display at once

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(autoSlide);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + productsToShow >= products.length ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - productsToShow : prevIndex - 1
        );
    };

    const toggleLike = (productId: number) => {
        setLikedProducts((prevLikedProducts) =>
            prevLikedProducts.includes(productId)
                ? prevLikedProducts.filter(id => id !== productId)
                : [...prevLikedProducts, productId]
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
                {halfStar && <Icon as={StarIcon} color="yellow.400" boxSize="5" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <Icon key={index} as={StarIcon} color="gray.300" />
                ))}
            </HStack>
        );
    };

    return (
        <Flex overflow="hidden" position="relative" w="100%" minH="350px">
            <Flex
                width={`${270 * products.length}px`} // Set width based on the total number of products
                transition="transform 0.5s ease"
                transform={`translateX(-${currentIndex * 270}px)`} // Move by the width of one product box
                gap="25px"
                justifyContent="flex-start"
            >
                {products.map((product) => (
                    <Box
                        key={product.id}
                        flex="0 0 270px" // Fixed width for each product box
                        textAlign="center"
                        display="flex"
                        alignItems="flex-start"
                        flexDirection="column"
                        minH="350px"
                        bg="white"
                    >
                        <Box
                            position="relative"
                            h="220px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor="#F5F5F5"
                            alignSelf="center"
                            w="100%" // Full width within the box
                        >
                            <Image
                                mixBlendMode="multiply"
                                src={product.image}
                                alt={product.name}
                                borderRadius="md"
                                h="100%"
                                w="100%"
                            />
                            <IconButton
                                aria-label="Like Product"
                                icon={<FaHeart color={likedProducts.includes(product.id) ? 'red' : 'gray'} size="25" />}
                                onClick={() => toggleLike(product.id)}
                                variant="ghost"
                                position="absolute"
                                top="10px"
                                right="10px"
                                _hover={{
                                    backgroundColor: 'transparent'
                                }}
                            />
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
                ))}
            </Flex>
            <IconButton
                onClick={prevSlide}
                icon={<FaArrowLeft color='white' />}
                aria-label="Previous"
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                backgroundColor='#DB4444'
                _hover={{
                    backgroundColor: '#DB4444'
                }}
            />
            <IconButton
                onClick={nextSlide}
                icon={<FaArrowRight color='white' />}
                aria-label="Next"
                position="absolute"
                right="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                backgroundColor='#DB4444'
                _hover={{
                    backgroundColor: '#DB4444'
                }}
            />
        </Flex>
    );
};