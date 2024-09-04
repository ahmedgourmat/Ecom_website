import { Button, Table, Tbody, Tr, Td, Thead, Th, Box, Center, Icon, Text } from '@chakra-ui/react';

const CommandTable = ({ command }: { command: any }) => {

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Email</Th>
                    <Th>Date</Th>
                    <Th>Confirmation</Th>
                    <Th>Details</Th>
                    <Th>Retour</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{command.user.email}</Td>
                    <Td>{command.createdAt}</Td>
                    <Td>
                        {command.confirme ? (
                            <Button colorScheme="green">Confirmed</Button>
                        ) : (
                            <Button colorScheme="red">Not Confirm</Button>
                        )}
                    </Td>
                    <Td>
                        <Button colorScheme="blue">Details</Button>
                    </Td>
                    <Td>
                        {command.retour && (
                            <Button colorScheme="red">Retour</Button>
                        )}
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
};

export default CommandTable;
