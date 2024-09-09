import { FaArrowLeft, FaArrowRight, FaHeart } from 'react-icons/fa';
import { Box, Image, Text, Flex, IconButton, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons'; // Import StarIcon
import useCrud from '../../Hooks/useCrud';
import { Link } from 'react-router-dom';
import { ProductItem } from './ProductItem';

interface Product {
    colors: string[]; // Array of color strings
    createdAt: string; // ISO 8601 date string
    desc: string; // Description of the product
    img: string; // URL to the product image
    nameP: string; // Product name
    price: number; // Product price
    promo: boolean; // Promo status
    promoPrice: number; // Promo price
    quantity: number; // Product quantity
    reviews: number[]; // Array of review ratings (assuming numeric)
    sellings: number; // Number of sellings
    sizes: string[]; // Array of size strings
    updatedAt: string; // ISO 8601 date string
    __v: number; // Version key (usually from Mongoose)
    _id: string; // MongoDB ObjectId as a string
}

export const BestSellingProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedProducts, setLikedProducts] = useState<number[]>([]);
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const { get } = useCrud()

    const productsToShow = 4; // Number of products to display at once

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(autoSlide);
    }, []);

    useEffect(() => {

        const fetchingData = async () => {
            setLoading(true)
            try {
                console.log('here')
                const data = await get('api/v1/product')
                const sortedData = data.sort((a: Product, b: Product) => b.sellings - a.sellings);
                setProducts(sortedData)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchingData()

    }, [])

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

    // const toggleLike = (productId: string) => {
    //     setLikedProducts((prevLikedProducts) =>
    //         prevLikedProducts.includes(productId)
    //             ? prevLikedProducts.filter(id => id !== productId)
    //             : [...prevLikedProducts, productId]
    //     );
    // };

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
                    <ProductItem product={product} key={product._id} />
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
