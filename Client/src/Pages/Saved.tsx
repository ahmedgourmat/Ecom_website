import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Wishlist } from '../Components/Saved/WishList'

export const Saved = () => {
    return (
        <Box
            p='50px 100px'
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='center'
            gap='60px'
        >
            <Flex
                w='100%'
                justifyContent='space-between'
                alignItems='center'
                p='0px 90px'
            >
                <Text
                    fontSize='2xl'
                    fontWeight='500'
                >
                    Wishlist(4)
                </Text>
                <Button
                    p='20px 60px'
                    fontSize='l'
                    border='1px solid grey'
                    backgroundColor='transparent'
                    _hover={{
                        backgroundColor: 'transparent'
                    }}
                >
                    Move All To Chart
                </Button>
            </Flex>
            <Wishlist />
        </Box>
    )
}
