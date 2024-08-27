import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Advertisment = () => {
  const adsData = ['red', 'green', 'yellow', 'blue', 'black'];
  const [item, setItem] = useState(0);

  // Auto-skip to the next ad every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setItem((prevItem) => (prevItem + 1) % adsData.length);
    }, 5000); // 10 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [adsData.length]);

  return (
    <Box w="100%" height="300px" p='30px 100px 0px 100px ' position="relative" overflow="hidden">
      {adsData.map((elem, index) => (
        <Box
          key={index}
          w="100%"
          bgColor={elem}
          display={index === item ? 'block' : 'none'}
          height="100%"
          transition="opacity 0.5s ease-in-out"
        />
      ))}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        bottom="10px"  // Positioning at the bottom
        left="50%"
        transform="translateX(-50%)"
        gap="10px"
      >
        {adsData.map((_, index) => (
          <Box
            key={index}
            onClick={() => setItem(index)}
            borderRadius="50%"
            height="17px"
            width="17px"
            bgColor={index === item ? 'orange' : 'white'} // Highlight selected box
            cursor="pointer"
            transition="background-color 0.3s ease"
            border='3px solid white'
          />
        ))}
      </Box>
    </Box>
  );
};
