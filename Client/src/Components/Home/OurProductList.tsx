import { Box, Flex, IconButton, Image, Text, Button, HStack, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import useCrud from '../../Hooks/useCrud';
import { ProductItem } from './ProductItem';


export const OurProductList = () => {
    
    const [visibleCount, setVisibleCount] = useState(8);
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const {get} = useCrud()

    

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
                    <ProductItem key={product._id} product={product} />
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
