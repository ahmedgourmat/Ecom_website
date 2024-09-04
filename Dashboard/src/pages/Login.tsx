import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCrud from '../hooks/useCrud';

export const Login = () => {

  const navigate = useNavigate()
  const {post} = useCrud()
  const [loading , setLoading] = useState(false)
  const [values , setValues] = useState({
    email : '',
    password : ''
  })

  const changeHandler = (e : any)=>{
    setValues({...values , [e.target.name] : e.target.value})
  }

  const submitHandler = async()=>{
    setLoading(true)

    try {
      const token = await post('api/v1/admin/login',values)
      console.log(token)
      localStorage.setItem('token' , token)
      setValues({
        email : '',
        password : ''
      })
      navigate('/products')
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }

  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      {loading && <Text>Loding</Text>}
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Login
      </Heading>
      <Stack spacing="4">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" onChange={e=>changeHandler(e)} value={values.email} name='email'/>
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" onChange={changeHandler} value={values.password} name='password'/>
        </FormControl>
        <Button colorScheme="blue" size="lg" width="full" mt="4" onClick={submitHandler}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};
