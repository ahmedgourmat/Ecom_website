import { Box, Flex, IconButton, Image, Text, Button, HStack, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import useCrud from '../../Hooks/useCrud';


export const OurProductList = () => {
    const [likedProducts, setLikedProducts] = useState<number[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const {get} = useCrud()

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


    useEffect(()=>{

        const fetchingData = async ()=>{
            setLoading(true)
            try {
                console.log('here')
                const data = await get('api/v1/product')
                console.log('here')
                console.log(data)
                setProducts(data)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }

        fetchingData()

    },[])


    return (
        <Flex gap='40px' flexDir="column">
            <Flex width="100%" gap="25px" flexWrap="wrap" justifyContent="flex-start">
                {products.slice(0, visibleCount).map((product : any) => (
                    <Link 
                        to={`/product/${product._id}`}
                        key={product._id} style={{ width: '270px', flex: '0 0 auto' }}
                    >
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
                                <IconButton
                                    aria-label="Like Product"
                                    icon={<FaHeart color={likedProducts.includes(product._id) ? 'red' : 'gray'} size="25" />}
                                    onClick={() => toggleLike(product._id)}
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
                            <Text fontWeight="bold" mt="2">{product.nameP}</Text>
                            <Flex justifyContent="space-between" gap="5px" alignItems="center" mt="1">
                                <Text color="red.500" fontWeight="bold">${product.price}</Text>
                                {/* <Text color="gray.500" textDecoration="line-through">${product.price}</Text> */}
                            </Flex>
                            <Box mt="2">
                                {renderStars(product.reviews)}
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
