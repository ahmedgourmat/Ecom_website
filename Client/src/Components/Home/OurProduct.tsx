import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { OurProductList } from './OurProductList'

export const OurProduct = () => {
    return (
        <Box w="100%" p="20px"
            display='flex'
            flexDirection='column'
            gap='30px'
        >
            <Box
                display='flex'
                alignItems='center'
                gap='20px'
            >
                <Box
                    w='17px'
                    height='30px'
                    bgColor='#DB4444'
                    borderRadius='5px'
                />
                <Text
                    color='#DB4444'
                    fontWeight='bold'
                >Our products</Text>
            </Box>
            <Text fontSize="2xl" fontWeight="bold">Explore Our Product</Text>
            <OurProductList />
        </Box>
    )
}
