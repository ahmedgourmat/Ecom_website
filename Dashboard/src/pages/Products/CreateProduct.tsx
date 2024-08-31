import React, { useState } from 'react';
import { Box, Input, Select, Textarea, Button, FormControl, FormLabel, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { Colors } from '../../Constant/Colors';
import usePost from '../../hooks/usePost'; // Assuming usePost is imported from hooks
import { UserState } from '../../hooks/loginHook';

interface ProductData {
  nameP: string;
  desc: string;
  quantity: number;
  price: number;
  categorie: string;
  colors: string[];
  sizes: string[];
  promo: boolean;
  promoPrice: number;
  img: string; // Storing base64 string of the image
}

export const CreateProduct = () => {
  const [data, setData] = useState<ProductData>({
    nameP: '',
    desc: '',
    quantity: 0,
    price: 0,
    categorie: '',
    colors: [],
    sizes: [],
    promo: false,
    promoPrice: 0,
    img: '', // Initialize as empty string for base64 image
  });
  const [loading, setLoading] = useState(false);

  const { token } = UserState();

  const post = usePost();

  const convertBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length === 1) {
      const base64 = await convertBase64(files[0]);
      setData((prevData) => ({
        ...prevData,
        img: base64,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: name === 'colors' || name === 'sizes' ? value.split(' ') : value,
    }));
  };

  const handlePromoChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      promo: value === 'true',
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await post('api/v1/product', data, token);
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      justifyContent="center"
    >
      <Box flex="1" p="20px" borderRadius="5px" boxShadow="sm" m="10px">
        <FormControl mb="4">
          <FormLabel>Image</FormLabel>
          <Input type="file" p="1" bgColor="white" onChange={uploadImage} />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Colors</FormLabel>
          <Input type="text" name="colors" placeholder="Enter colors" bgColor="white" onChange={handleChange} />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Sizes</FormLabel>
          <Input type="text" name="sizes" placeholder="Enter sizes" bgColor="white" onChange={handleChange} />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Name</FormLabel>
          <Input type="text" name="nameP" placeholder="Enter product name" bgColor="white" onChange={handleChange} />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Description</FormLabel>
          <Textarea name="desc" placeholder="Enter description" bgColor="white" onChange={handleChange} />
        </FormControl>
      </Box>

      <Box flex="1" p="20px" borderRadius="5px" boxShadow="sm" m="10px">
        <FormControl mb="4">
          <FormLabel>Quantity</FormLabel>
          <Input type="number" name="quantity" placeholder="Enter quantity" bgColor="white" onChange={handleChange} />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Price</FormLabel>
          <Input type="number" name="price" placeholder="Enter price" bgColor="white" onChange={handleChange} />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Category</FormLabel>
          <Select name="categorie" placeholder="Select category" bgColor="white" onChange={handleChange}>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </Select>
        </FormControl>

        <RadioGroup defaultValue="false" mb="4" onChange={handlePromoChange}>
          <FormLabel>Promotion</FormLabel>
          <Stack spacing={5} direction="row">
            <Radio colorScheme="red" value="false">
              False
            </Radio>
            <Radio colorScheme="green" value="true">
              True
            </Radio>
          </Stack>
        </RadioGroup>

        <FormControl mb="4">
          <FormLabel>Promotion Price</FormLabel>
          <Input type="number" name="promoPrice" placeholder="Enter promo price" bgColor="white" onChange={handleChange} />
        </FormControl>

        <Button colorScheme="teal" mt="4" onClick={handleSubmit} isLoading={loading}>
          Create Product
        </Button>
      </Box>
    </Box>
  );
};
