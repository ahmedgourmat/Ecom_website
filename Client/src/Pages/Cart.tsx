import { Box } from "@chakra-ui/react";
import { CartList } from "../Components/Cart/Cartlist";
import { CartTotal } from "../Components/Cart/CartTotal";
import { Coupon } from "../Components/Cart/Coupon";
import { useState } from "react";

export const Cart: React.FC = () => {
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="50px"
      mt="40px"
      mb="40px"
    >
      <CartList onSubtotalChange={setSubtotal} />
      <Box display="flex" w="80%" justifyContent="space-between">
        <Coupon />
        <CartTotal subtotal={subtotal} shipping={shipping} total={total} />
      </Box>
    </Box>
  );
};