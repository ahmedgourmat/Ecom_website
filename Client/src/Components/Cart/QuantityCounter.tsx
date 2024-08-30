import { HStack, Button, Input, Icon } from "@chakra-ui/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FC } from "react";

interface QuantityCounterProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
}

const QuantityCounter: FC<QuantityCounterProps> = ({ quantity, onChange }) => {
  const increment = () => onChange(quantity + 1);
  const decrement = () => onChange(quantity > 1 ? quantity - 1 : 1);

  return (
    <HStack
      maxW="84px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      h="35px"
      gap={0}
    >
      <Button
        size="sm"
        onClick={decrement}
        disabled={quantity <= 1}
        bg="#FFFFFF"
        _hover={{ bg: "#FFFFFF" }}
        px={0}
        py={2}
      >
        <Icon as={IoIosArrowBack} _hover={{ color: "gray.200" }} />
      </Button>
      <Input
        value={quantity}
        readOnly
        textAlign="center"
        px={0}
        py={2}
        borderWidth={0}
      />
      <Button
        size="sm"
        onClick={increment}
        bg="#FFFFFF"
        _hover={{ bg: "#FFFFFF" }}
        px={0}
        py={2}
      >
        <Icon as={IoIosArrowForward} _hover={{ color: "gray.200" }} />
      </Button>
    </HStack>
  );
};

export default QuantityCounter;
