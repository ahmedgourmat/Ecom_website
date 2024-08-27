import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { BestSellingProductSlider } from "./BestSellingProductSlider";



const BestSellingProduct: React.FC = () => {


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
        >This month</Text>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">Best Selling Product</Text>
        <Button>View Products</Button>
      </Flex>
      <BestSellingProductSlider />
    </Box>
  );
};

export default BestSellingProduct;
