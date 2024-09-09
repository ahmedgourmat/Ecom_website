import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Skeleton,
  SkeletonText,
  useToast,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useCrud from '../../Hooks/useCrud';
import { UserState } from '../../Hooks/useLogin';
import { Link as ReactRouterLink } from 'react-router-dom';

export const CommandCancellation = () => {
  const [commands, setCommands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { get } = useCrud();
  const { token } = UserState() ?? {};
  const toast = useToast();

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const res = await get('api/v1/command/user?retour=true', token);
        setCommands(res);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error fetching commands.',
          description: 'Unable to fetch commands. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);


  return (
    <Box p={4}>
      {loading ? (
        <Box>
          <Skeleton height="40px" mb={4} />
          <Skeleton height="40px" mb={4} />
          <Skeleton height="40px" mb={4} />
          <Skeleton height="40px" mb={4} />
        </Box>
      ) : commands.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No commands available.
        </Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Confirmed</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {commands.map((command: any) => (
              <Tr key={command._id}>
                <Td>{new Date(command.createdAt).toLocaleDateString()}</Td>
                <Td>{command.confirm ? 'Yes' : 'No'}</Td>
                <Td>
                  <Button
                    as={ReactRouterLink}
                    colorScheme="blue"
                    to={`/profile/commands/${command._id}`}
                    state={{ command }}
                  >
                    Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};
