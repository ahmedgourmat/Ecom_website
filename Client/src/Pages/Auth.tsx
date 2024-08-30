import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { Login } from "../Components/Auth/Login";
import { Signup } from "../Components/Auth/Signup";
import loginimg from "../Assets/Side Image.svg";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box display="flex" justifyContent='center' alignItems="center" gap="6%" mt="40px" mb="40px">
      <Box
        boxSize='500px'
      >
        <Image
          src={loginimg}
          alt='Login image'
          objectFit='cover'
        />
      </Box>
      <Box>
        {isLogin ? <Login onToggle={toggleAuth} /> : <Signup onToggle={toggleAuth} />}
      </Box>
    </Box>
  );
};
