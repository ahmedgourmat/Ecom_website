import { Box, Button, Input, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import useCrud from "../../Hooks/useCrud";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../Hooks/useLogin";


interface LoginProps {
  onToggle: () => void;
}

export const Login = ({ onToggle }: LoginProps) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { post } = useCrud();
  const toast = useToast();
  const navigate = useNavigate()
  const {setUser} = UserState() ?? {}

  const clickHandler = async () => {
    
    setLoading(true);
    try {
      const res = await post('api/v1/user/login', values);
      // On successful login, you can redirect or change application state
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      localStorage.setItem('userToken' , res.token)
      localStorage.setItem('userInfo',JSON.stringify(res.user))
      setUser(JSON.stringify(res.user))
      navigate('/')
    } catch (error : any) {
      console.log(error)
      toast({
        title: "Login failed",
        description: error.response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    } finally {
      setLoading(false);
    }
  };
  

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Text fontWeight="500" fontSize="36px">
          Login to Exclusive
        </Text>
        <Text fontWeight="400" fontSize="16px">
          Enter your details below
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="30px">
        <Input
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          placeholder="Email or Phone Number"
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
          onChange={changeHandler}
          name="email"
          value={values.email}
        />
        <Input
          type="password"
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          placeholder="Password"
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
          onChange={changeHandler}
          name="password"
          value={values.password}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            bg="#DB4444"
            color="#FAFAFA"
            borderRadius="4px"
            w="140px"
            h="46px"
            _hover={{ bg: "#C23333" }}
            _focus={{
              bg: "#DB4444",
              boxShadow: "none",
            }}
            onClick={clickHandler}
            isLoading={loading} // Loading indicator
            loadingText="Logging in..."
          >
            Log in
          </Button>
          <Link
            color="#DB4444"
            fontWeight="500"
            _hover={{ textDecoration: "underline" }}
          >
            Forgot Password?
          </Link>
        </Box>
        <Text opacity="70%" textAlign="center" mt="20px">
          Don't have an account?{" "}
          <Link
            fontWeight="500"
            color="#DB4444"
            _hover={{ textDecoration: "underline" }}
            onClick={onToggle}
          >
            Sign up
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
