import {
  Box,
  Input,
  Textarea,
  Image,
  RadioGroup,
  Radio,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Colors } from "../../Constant/Colors";
import useCrud from "../../hooks/useCrud";
import { UserState } from "../../hooks/loginHook";

export const ProductDetails = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState(state.product || {});
  const [editable, setEditable] = useState(false);
  const {remove} = useCrud()
  const token = UserState()?.token;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePromoChange = (value: string) => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      promo: value === "true",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prevProduct: any) => ({
        ...prevProduct,
        img: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const deleteHandle = async()=>{
      
    try {
      await remove(`api/v1/product/${product._id}`,token)
      console.log('removed successfully')
    } catch (error) {
      console.log(error)
    }
  }

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
      gap="30px"
      overflowY="scroll"
    >
      {/* Left side - Product Image */}
      <Box flex="1" display="flex" flexDir="column" alignItems="center">
        <Image
          src={product.img}
          alt={product.nameP}
          borderRadius="5px"
          boxShadow="lg"
          maxW="100%"
          mb="20px"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!editable}
          mb="20px"
        />
        <Box
          display='flex'
          gap='20px'
        >
          <Button
            colorScheme={editable ? "green" : "blue"}
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Save Changes" : "Edit Product"}
          </Button>
          <Button
            colorScheme="red"
            onClick={deleteHandle}
          >
            delete
          </Button>
        </Box>
      </Box>

      {/* Right side - Product Details */}
      <Box flex="2" display="flex" flexDir="column" gap="20px">
        <Box>
          <Box fontWeight="bold" mb="8px">
            Product Name:
          </Box>
          <Input
            value={product.nameP}
            name="nameP"
            onChange={handleInputChange}
            isReadOnly={!editable}
          />
        </Box>

        <Box>
          <Box fontWeight="bold" mb="8px">
            Price:
          </Box>
          <Input
            value={product.price}
            name="price"
            onChange={handleInputChange}
            isReadOnly={!editable}
          />
        </Box>

        <Box>
          <Box fontWeight="bold" mb="8px">
            Promo:
          </Box>
          <RadioGroup
            onChange={handlePromoChange}
            value={product.promo ? "true" : "false"}
            isDisabled={!editable}
          >
            <Stack direction="row">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        {product.promo && (
          <Box>
            <Box fontWeight="bold" mb="8px">
              Promo Price:
            </Box>
            <Input
              value={product.promoPrice}
              name="promoPrice"
              onChange={handleInputChange}
              isReadOnly={!editable}
            />
          </Box>
        )}

        <Box>
          <Box fontWeight="bold" mb="8px">
            Description:
          </Box>
          <Textarea
            value={product.desc}
            name="desc"
            onChange={handleInputChange}
            isReadOnly={!editable}
            resize="vertical"
          />
        </Box>

        <Box>
          <Box fontWeight="bold" mb="8px">
            Colors (separated by space):
          </Box>
          <Input
            value={product.colors.join(" ")}
            name="colors"
            onChange={handleInputChange}
            isReadOnly={!editable}
          />
        </Box>

        <Box>
          <Box fontWeight="bold" mb="8px">
            Sizes (separated by space):
          </Box>
          <Input
            value={product.sizes.join(" ")}
            name="sizes"
            onChange={handleInputChange}
            isReadOnly={!editable}
          />
        </Box>
      </Box>
    </Box>
  );
};
