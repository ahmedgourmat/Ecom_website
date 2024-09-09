import { Button, Table, Tbody, Tr, Td, Thead, Th } from '@chakra-ui/react';
import useCrud from '../../hooks/useCrud';
import { UserState } from '../../hooks/loginHook';
import { Link as ReactRouterLink } from 'react-router-dom'

const CommandTable = ({ command }: { command: any }) => {

    const { update } = useCrud()
    const { token } = UserState() ?? {};

    const confirmCommand = async () => {

        try {
            await update(`api/v1/command/confirm/${command._id}`, {}, token)
            console.log('updated successfully')
        } catch (error) {
            console.log(error)
        }

    }



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
                    <Td>{command.createdAt.split('T')[0]}</Td>
                    <Td>
                        {command.confirm ? (
                            <Button colorScheme="green">Confirmed</Button>
                        ) : (
                            <Button
                                colorScheme="red"
                                onClick={confirmCommand}
                            >Not Confirm</Button>
                        )}
                    </Td>
                    <Td>
                        <Button
                            colorScheme="blue"
                            as={ReactRouterLink}
                            to={`/command/${command._id}`}
                            state={{ command: command }}
                        >
                            Details
                        </Button>
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
