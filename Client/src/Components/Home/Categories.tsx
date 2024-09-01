import { Box, Flex, Text } from '@chakra-ui/react'
import { CategoriesSlider } from './CategoriesSlider'

export const Categories = () => {
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
                >Our categories</Text>
            </Box>
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="bold">Browse By Category</Text>
            </Flex>
            <CategoriesSlider/>
        </Box>
    )
}
