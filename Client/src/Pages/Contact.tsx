import {
  Box, Flex, Text, Input, Button, VStack, Icon,
  FormControl, FormLabel, useToast
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import useCrud from '../Hooks/useCrud';
import { UserState } from '../Hooks/useLogin';
import { useState } from 'react';

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { post } = useCrud();
  const { token } = UserState() ?? {};
  const [message, setMessage] = useState('');
  const toast = useToast(); // Using Chakra UI's toast for notifications

  const createContact = async () => {
    if (!message) {
      toast({
        title: "Error",
        description: "Message cannot be empty.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Prevent function from continuing if message is empty
    }

    setLoading(true);
    try {
      await post('api/v1/contact', { message }, token); // Ensure the message is sent as an object if required by your backend
      toast({
        title: "Success",
        description: "Message sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setMessage('')
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction={['column', 'row']} p='50px' gap="6">
      <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
        <VStack align="start" spacing={4}>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Call To Us</Text>
            <Icon as={PhoneIcon} />
            <Text ml={2}>+80011112222</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Write To Us</Text>
            <Icon as={EmailIcon} />
            <Text ml={2}>support@exclusive.com</Text>
          </Box>
        </VStack>
      </Box>

      <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
        <VStack spacing={4} as="form">
          <FormControl>
            <FormLabel>Your Message</FormLabel>
            <Input 
              as="textarea" 
              placeholder="hello , I have problem with ...." 
              height='100px' 
              value={message}
              onChange={(e) => setMessage(e.target.value)} 
              isDisabled={loading} // Disable input when loading
            />
          </FormControl>
          <Button
            colorScheme="red"
            size="lg"
            type="submit"
            onClick={createContact}
            isLoading={loading} // Show loading indicator when loading
            loadingText="Sending..."
            disabled={!message || loading} // Disable button when message is empty or loading
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
