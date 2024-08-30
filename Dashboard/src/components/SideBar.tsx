import { Box, Text, Button, Collapse, VStack } from "@chakra-ui/react";
import { useState } from "react";

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
      bg="gray.800"
      color="white"
      p="4"
      height="100vh"
      boxShadow="md"
      position='fixed'
    >
      <Text fontSize="xl" mb="4">
        DashBoard
      </Text>
      <VStack align="start" spacing="4">
        <Box width="100%">
          <Button
            width="100%"
            bg="gray.700"
            onClick={toggleProductOptions}
            _hover={{ bg: "gray.600" }}
          >
            Product
          </Button>
          <Collapse in={showProductOptions} animateOpacity>
            <VStack align="start" spacing="2" mt="2" pl="4">
              <Button
                width="100%"
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
              >
                Create Product
              </Button>
              <Button
                width="100%"
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
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
            bg="gray.700"
            onClick={toggleCommandOptions}
            _hover={{ bg: "gray.600" }}
          >
            Command
          </Button>
          <Collapse in={showCommandOptions} animateOpacity>
            <VStack align="start" spacing="2" mt="2" pl="4">
              <Button
                width="100%"
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
              >
                See All Commands
              </Button>
              <Button
                width="100%"
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
              >
                Confirmed Commands
              </Button>
              <Button
                width="100%"
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
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
