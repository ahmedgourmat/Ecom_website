import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Box, Image, Badge, Text, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    discount: number;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
}


export const BestSellingProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const products: Product[] = [
        { id: 1, name: "HAVIT HV-G92 Gamepad", discount: 40, price: 120, originalPrice: 160, image: "/path/to/gamepad.jpg", rating: 4.5, reviews: 88 },
        { id: 2, name: "AK-900 Wired Keyboard", discount: 35, price: 960, originalPrice: 1160, image: "/path/to/keyboard.jpg", rating: 4, reviews: 75 },
        { id: 3, name: "IPS LCD Gaming Monitor", discount: 30, price: 370, originalPrice: 400, image: "/path/to/monitor.jpg", rating: 5, reviews: 99 },
        { id: 4, name: "S-Series Comfort Chair", discount: 25, price: 375, originalPrice: 400, image: "/path/to/chair.jpg", rating: 4.8, reviews: 99 },
        { id: 5, name: "Gaming Mouse", discount: 20, price: 50, originalPrice: 65, image: "/path/to/mouse.jpg", rating: 4.2, reviews: 150 },
        // Add more products as needed
    ];

    const productsToShow = 3; // Number of products to display at once

    // Auto slide every 10 seconds
    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 10000);

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
    return (
        <Flex overflow="hidden" position="relative" w="100%" h='350px'>
            <Flex
                w="100%"
                transition="transform 0.5s ease"
                transform={`translateX(-${(currentIndex * 100) / productsToShow}%)`}
                gap='25px'
            >
                {products.map((product) => (
                    <Box
                        key={product.id}
                        flex={`0 0 ${100 / productsToShow}%`}
                        p="10px"
                        border="1px solid #e2e2e2"
                        borderRadius="md"
                        boxShadow="md"
                        textAlign="center"
                    >
                        <Image src={product.image} alt={product.name} borderRadius="md" />
                        <Badge colorScheme="red" mt="2">{`-${product.discount}%`}</Badge>
                        <Text fontWeight="bold" mt="2">{product.name}</Text>
                        <Flex justifyContent="space-between" alignItems="center" mt="1">
                            <Text color="red.500" fontWeight="bold">${product.price}</Text>
                            <Text color="gray.500" textDecoration="line-through">${product.originalPrice}</Text>
                        </Flex>
                    </Box>
                ))}
            </Flex>
            <IconButton
                onClick={prevSlide}
                icon={<FaArrowLeft />}
                aria-label="Previous"
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
            />
            <IconButton
                onClick={nextSlide}
                icon={<FaArrowRight />}
                aria-label="Next"
                position="absolute"
                right="0"
                top="50%"
                transform="translateY(-50%)"
            />
        </Flex>
    )
}
