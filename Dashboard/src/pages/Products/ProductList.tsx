import { Box, Input, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { Colors } from "../../Constant/Colors";
import { ProductsDiagramme } from "../../components/Products/ProductsDiagramme";
import { useEffect, useState } from "react";
import useCrud from "../../hooks/useCrud";
import { UserState } from "../../hooks/loginHook";
import { ProductItem } from "../../components/Products/ProductItem";

interface Product {
  _id: string;
  nameP: string;
  desc: string;
  quantity: number;
  price: number;
  img: string;
  categorie?: string;
  sizes: string[];
  colors: string[];
  promo: boolean;
  promoPrice?: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const ProductList = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = useCrud();
  const token = UserState()?.token;

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const res = await get('api/v1/product', { nameP: search }, token);
        setData(res);
        console.log(res); // Ensure data is as expected
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, [search]);

  return (
    <Box
      w="100%"
      bgColor={Colors.primary}
      h="calc(100vh - 40px)"
      p="20px"
      borderRadius="5px"
      boxShadow="md"
      border="2px solid #F3F3F3"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="30px"
      overflowY="scroll"
    >
      <Input
        padding="20px"
        placeholder="Search for a product ?"
        border={`2px solid ${Colors.secondary2}`}
        color={Colors.text2}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <Box w="100%" h="350px">
        {loading ? (
          <Skeleton height="100%" />
        ) : data.length > 0 ? (
          <ProductsDiagramme products={data} />
        ) : (
          <Text>No products available</Text>
        )}
      </Box>

      <Box display="flex" alignItems="center" gap="40px" flexWrap="wrap" width="100%">
        {loading ? (
          Array(6).fill(0).map((_, index) => (
            <Box key={index} w="200px" h="250px" p="10px">
              <Skeleton height="150px" />
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Box>
          ))
        ) : (
          data.map((elem) => (
            <ProductItem key={elem._id} product={{ _id: elem._id, nameP: elem.nameP, img: elem.img }} />
          ))
        )}
      </Box>
    </Box>
  );
};
