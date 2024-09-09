import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ProductItem = ({ product } : any) => {
  const [liked, setLike] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data (assuming user data is available)
  useEffect(() => {
    const fetchUserData = async () => {
      // Replace with your logic to fetch user data (e.g., from localStorage)
      const user = JSON.parse(localStorage.getItem('userInfo'));
      setUserData(user);

      // Check if the product is already liked
      if (user && user.likedProduct.includes(product._id)) {
        setLike(true);
      }
    };
    fetchUserData();
  }, [product._id]);

  const toggleLike = async () => {
    if (!userData) {
      return; // Handle case where user data is not available
    }
    
    const productId = product._id;
    const like = !liked;

    try {
      const response = await fetch(`/api/liked-products/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ like }),
      });

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        return;
      }

      setLike(like);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          opacity: 1,
        },
      }}
      gap="10px"
      style={{ width: '270px', flex: '0 0 auto' }}
    >
      {/* Heart Icon */}
      <IconButton
        aria-label={liked ? 'Unlike Product' : 'Like Product'}
        icon={<FaHeart color={liked ? 'red' : 'gray'} size="25" />}
        onClick={toggleLike}
        variant="ghost"
        position="absolute"
        top="10px"
        right="10px"
        _hover={{ backgroundColor: 'transparent' }}
        zIndex="2"
      />

      {/* Product Link and Image */}
      <Link to={`/product/${product._id}`} style={{ width: '100%' }}>
        <Box
          position="relative"
          h="220px"
          display="flex"
          justifyContent="center"
          backgroundColor="#F5F5F5"
          alignSelf="center"
          w="100%"
        >
          <Image mixBlendMode="multiply" src={product.img} alt={product.nameP} borderRadius="md" h="100%" w="100%" />
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
            See details
          </Text>
        </Box>
      </Link>

      {/* Product Name and Price */}
      <Text fontWeight="bold" mt="2">
        {product.nameP}
      </Text>
      <Flex justifyContent="space-between" gap="5px" alignItems="center" mt="1">
        <Text color="red.500" fontWeight="bold">
          ${product.price}
        </Text>
      </Flex>
    </Box>
  );
};
