import { Box } from "@chakra-ui/react";
import { CartList } from "../Components/Cart/CartList";
import { CartTotal } from "../Components/Cart/CartTotal";
import { Coupon } from "../Components/Cart/Coupon";
import { useState } from "react";

export const Cart: React.FC = () => {
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 50;
  const total = subtotal + shipping;

  // State to determine if the cart is empty
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  // Callback function to update if the cart is empty based on the subtotal
  const handleSubtotalChange = (newSubtotal: number) => {
    setSubtotal(newSubtotal);
    setIsCartEmpty(newSubtotal === 0);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="50px"
      pt='74px'
      mb="40px"
    >
      <CartList onSubtotalChange={handleSubtotalChange} />
      
      {!isCartEmpty && ( // Conditionally render Coupon and CartTotal if the cart is not empty
        <Box display="flex" w="80%" justifyContent="space-between">
          <Coupon />
          <CartTotal subtotal={subtotal} shipping={shipping} total={total} />
        </Box>
      )}
    </Box>
  );
};
