import { Box, Button, Collapse, Text, Textarea, VStack, useToast, Spinner } from '@chakra-ui/react';
import { Colors } from '../../Constant/Colors';
import { useState } from 'react';
import useCrud from '../../hooks/useCrud';
import { UserState } from '../../hooks/loginHook';

export const Item = ({ elem }: any) => {
    const { update } = useCrud();
    const { token } = UserState() ?? {};
    const toast = useToast(); // Initialize Chakra's useToast hook

    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for sending reply

    const handleReplyToggle = () => {
        setIsReplyOpen(!isReplyOpen);
    };

    const handleSendReply = async (id: any) => {
        if (!reply.trim()) {
            toast({
                title: "Reply cannot be empty.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            await update(`api/v1/contact/${id}`, { reply }, token);
            toast({
                title: "Reply sent successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setReply('');
            setIsReplyOpen(false);
        } catch (error : any) {
            toast({
                title: "Error sending reply.",
                description: error.message || "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            key={elem._id}
            w="100%"
            p="20px"
            border="1px solid #CBD5E0"
            borderRadius="8px"
            bg="white"
            boxShadow="md"
            _hover={{ boxShadow: 'lg' }}
            transition="box-shadow 0.3s"
        >
            <VStack align="start" spacing={4} w="100%">
                <Text fontWeight="bold" color={Colors.primary}>User Name: {elem.user.name}</Text>
                <Text>Email: {elem.user.email}</Text>
                <Text>Phone: {elem.user.numTel}</Text>
                <Text>Location: {elem.user.location}</Text>

                <Text mt={4} fontWeight="bold">Message:</Text>
                <Text bg="gray.100" p={4} borderRadius="md" boxShadow="sm" w="100%">
                    {elem.message}
                </Text>

                <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={handleReplyToggle}
                >
                    {isReplyOpen ? 'Cancel Reply' : 'Reply'}
                </Button>

                <Collapse in={isReplyOpen} animateOpacity>
                    <Box mt={4} w="100%">
                        <Textarea
                            placeholder="Type your reply here..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            size="sm"
                            resize="none"
                            mb={2}
                        />
                        <Button 
                            colorScheme="teal" 
                            onClick={() => handleSendReply(elem._id)}
                            isDisabled={loading} // Disable the button when loading
                        >
                            {loading ? <Spinner size="sm" /> : 'Send Reply'}
                        </Button>
                    </Box>
                </Collapse>
            </VStack>
        </Box>
    );
};
