import { Box, Text, VStack, Divider, Skeleton, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useCrud from '../../Hooks/useCrud';
import { UserState } from '../../Hooks/useLogin';

export const Replies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { get } = useCrud();
  const { token } = UserState() ?? {};

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const res = await get('api/v1/contact/user', token);
        console.log(res);
        setData(res.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);

  return (
    <Box p="20px">
      {loading ? (
        // Skeleton loading state
        <Stack spacing={6}>
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} height="150px" borderRadius="8px" />
          ))}
        </Stack>
      ) : data.length === 0 ? (
        // "No Data" message when there are no messages
        <Box
          p="20px"
          bg="gray.100"
          borderRadius="8px"
          textAlign="center"
          boxShadow="md"
        >
          <Text fontSize="lg" color="gray.500">
            No messages available.
          </Text>
        </Box>
      ) : (
        <VStack
          spacing={6}
          align="stretch"
          w="100%"
          bg="gray.50"
          borderRadius="8px"
          boxShadow="md"
          p="20px"
        >
          {data.map((item: any) => (
            <Box
              key={item._id}
              p="20px"
              bg="white"
              border="1px solid #CBD5E0"
              borderRadius="8px"
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
              transition="box-shadow 0.3s"
            >
              <VStack align="start" spacing={4} w="100%">
                <Text fontWeight="bold" color="teal.500">
                  User: {item.user.name}
                </Text>
                <Text>Email: {item.user.email}</Text>

                <Text mt={2} fontWeight="bold">
                  Message:
                </Text>
                <Text bg="gray.100" p={4} borderRadius="md" w="100%">
                  {item.message}
                </Text>

                {item.replied ? (
                  <>
                    <Divider />
                    <Text mt={2} fontWeight="bold" color="teal.600">
                      Reply:
                    </Text>
                    <Text bg="gray.50" p={4} borderRadius="md" w="100%">
                      {item.reply}
                    </Text>
                  </>
                ) : (
                  <Text color="gray.400" mt={4}>
                    No reply yet
                  </Text>
                )}
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};
