import { Box, Input, Text } from "@chakra-ui/react"
import { CiSearch } from "react-icons/ci"
import { CiHeart } from "react-icons/ci"
import { CiShoppingCart } from "react-icons/ci"
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useState } from "react"

export const NavBar = () => {

    const token = ''

    const [search , setSearch] = useState('')


    return (
        <Box
            display='flex'
            alignItems='center'
            p='20px 150px'
            justifyContent='space-between'
            borderBottom='2px solid #E9E9E9'
        >
            <Box>
                <Text
                    fontSize='25px'
                    textShadow='0px 1px 2px black'
                >Exclusive</Text>
            </Box>
            <Box
                display='flex'
                alignItems='center'
                gap='40px'
            >
                <ChakraLink as={ReactRouterLink} to='/'>
                    Home
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/contact'>
                    Contact
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/about'>
                    About
                </ChakraLink>
                {
                    token ?
                        <ChakraLink as={ReactRouterLink} to='/profile'>
                            Profile
                        </ChakraLink>   
                        :
                        <ChakraLink as={ReactRouterLink} to='/auth'>
                            Signup
                        </ChakraLink>
                }

            </Box>
            <Box
                display='flex'
                alignItems='center'
                gap='20px'
            >
                <Box
                    display='flex'
                    alignItems='center'
                    bgColor='#EFEFEF'
                    p='5px 15px'
                    borderRadius='5px'
                >
                    <Input 
                        variant='unstyled' 
                        placeholder='what are you looking for' 
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value)}}
                    />
                    <CiSearch fontSize='25px' />
                </Box>
                <CiHeart fontSize='25px' cursor='pointer' />
                <CiShoppingCart fontSize='25px' cursor='pointer' />
            </Box>
        </Box>
    )
}
