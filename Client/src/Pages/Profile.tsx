import {
  Box, Flex, VStack, Text, Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, Route, Routes } from "react-router-dom";
import { ProfileInfo } from '../Components/Profile/ProfileInfo';
import { Replies } from '../Components/Profile/Replies';
import { ProfileCommands } from '../Components/Profile/ProfileCommands';
import { CommandCancellation } from '../Components/Profile/CommandCancellation';
import { CommandDetails } from '../Components/Profile/CommandDetails';

export const Profile = () => {
  return (
    <Flex p={5}>
      <Box width="30%" pr={5}>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">Manage My Account</Text>
          <ChakraLink
            as={ReactRouterLink}
            to="/profile/"
          >
            My Profile
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/profile/replies"
          >
            Replies
          </ChakraLink>
          <Text fontSize="lg" fontWeight="bold">My Orders</Text>
          <ChakraLink
            as={ReactRouterLink}
            to="/profile/commands"
          >
            My Commands
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/profile/cancellation"
          >
            My Cancellations
          </ChakraLink>
        </VStack>
      </Box>

      <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
        <Routes>
          <Route path='/' element={<ProfileInfo/>} />
          <Route path='/replies' element={<Replies/>} />
          <Route path='/commands' element={<ProfileCommands/>} />
          <Route path='/cancellation' element={<CommandCancellation/>} />
          <Route path='/commands/:id' element={<CommandDetails/>} />
        </Routes>
      </Box>
    </Flex>
  );
}

