import { Box } from "@chakra-ui/react"
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'



export const SideBar = () => {
    const shopData = [
        "Woman's Fashion",
        "Men's Fashion",
        "Kids & Toys",
        "Electronics",
        "Medicine",
        "Sport & Outdoor",
        "Groceries & Pets",
        "Health & Beauty"
    ];



    return (
        <Box
            width='25%'
            p='30px 10px 0px 0px'
            borderRight='2px solid #E9E9E9'
            display='flex'
            flexDir='column'
            gap='5px'
            height='300px'
        >
            {shopData.map(elem => (
                <ChakraLink as={ReactRouterLink} to='/elem' fontWeight='500' fontSize='17px' _hover={{
                    textDecoration:'none'
                }}>
                    {elem}
                </ChakraLink>
            ))}
        </Box>
    )
}
