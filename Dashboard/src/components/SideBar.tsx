import { Box, Text, Button, Collapse, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Colors } from "../Constant/Colors";

export const SideBar = () => {
  // State variables to handle collapse of Product and Command options
  const [showProductOptions, setShowProductOptions] = useState(false);
  const [showCommandOptions, setShowCommandOptions] = useState(false);

  // Function to toggle product options
  const toggleProductOptions = () => setShowProductOptions(!showProductOptions);
  // Function to toggle command options
  const toggleCommandOptions = () => setShowCommandOptions(!showCommandOptions);

  return (
    <Box
      width="250px"
      bg={Colors.primary}
      color={Colors.text2}
      p="4"
      height="100vh"
      boxShadow="lg"
      position='fixed'
      borderRight='2px solid #F3F3F3'
    >
      <Text fontSize="xl" mb="4">
        DashBoard
      </Text>
      <VStack align="start" spacing="4">
        <Box width="100%">
          <Button
            width="100%"
            bg={Colors.secondary2}
            color={Colors.text}
            _hover={{
              backgroundColor : Colors.secondary2
            }}
            onClick={toggleProductOptions}
          >
            Product
          </Button>
          <Collapse in={showProductOptions} animateOpacity>
            <VStack align="start" spacing="2" mt="2" pl="4">
              <Button
                as={ReactRouterLink}
                to='/products/create'
                width="100%"
                variant="link"
                color={Colors.text2}
                textDecor='none'
              >
                Create Product
              </Button>
              <Button
                width="100%"
                variant="link"
                color={Colors.text2}
                as={ReactRouterLink}
                to='/products'
                textDecor='none'
              >
                See Products
              </Button>
            </VStack>
          </Collapse>
        </Box>

        {/* Command Section */}
        <Box width="100%">
          <Button
            width="100%"
            bg={Colors.secondary2}
            color={Colors.text}
            _hover={{
              backgroundColor : Colors.secondary2
            }}
            onClick={toggleCommandOptions}
          >
            Command
          </Button>
          <Collapse in={showCommandOptions} animateOpacity>
            <VStack align="start" spacing="2" mt="2" pl="4">
              <Button
                width="100%"
                variant="link"
                color={Colors.text2}
              >
                See All Commands
              </Button>
              <Button
                width="100%"
                variant="link"
                color={Colors.text2}
              >
                Confirmed Commands
              </Button>
              <Button
                width="100%"
                variant="link"
                color={Colors.text2}
              >
                Unconfirmed Commands
              </Button>
            </VStack>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
};
