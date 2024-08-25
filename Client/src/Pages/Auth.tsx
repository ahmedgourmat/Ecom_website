import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Login } from "../Components/Auth/Login";
import { Signup } from "../Components/Auth/Signup";
import loginimg from "../Assets/Side Image.svg";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box display="flex" alignItems="center" gap="6%" mt="40px" mb="40px">
      <img src={loginimg} alt="Login illustration" width="720px" />
      <Box>
        {isLogin ? <Login onToggle={toggleAuth} /> : <Signup onToggle={toggleAuth} />}
      </Box>
    </Box>
  );
};
