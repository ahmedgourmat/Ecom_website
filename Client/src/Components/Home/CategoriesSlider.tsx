import { LiaShoppingBagSolid } from "react-icons/lia";
import { GiJewelCrown, GiSonicShoes } from "react-icons/gi";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { RiTShirt2Line } from "react-icons/ri";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from 'react';

interface Category {
  id: number;
  name: string;
  icon: JSX.Element;  // Update the icon type
}

export const CategoriesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [scrollNeeded, setScrollNeeded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    { id: 1, name: "Clothes", icon: <RiTShirt2Line size="40" /> },
    { id: 2, name: "Accessory", icon: <GiJewelCrown size="40" /> },
    { id: 3, name: "Shoes", icon: <GiSonicShoes size="40" /> },
    { id: 4, name: "Bags", icon: <LiaShoppingBagSolid size="40" /> },
    { id: 5, name: "T-shirts", icon: <RiTShirt2Line size="40" /> },
  ];

  const categoriesToShow = 3; // Number of categories to display at once

  // Check if scroll is needed based on content width
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const contentWidth = contentRef.current?.scrollWidth || 0;

    setScrollNeeded(contentWidth > containerWidth);
  }, [categories]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + categoriesToShow >= categories.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - categoriesToShow : prevIndex - 1
    );
  };

  return (
    <Flex
      ref={containerRef}
      overflowX={scrollNeeded ? "auto" : "hidden"}
      position="relative"
      w="100%"
      minH="100px"
      p="20px 50px"
      justifyContent='center'
    >
      <Flex
        ref={contentRef}
        w="100%"
        transition="transform 0.5s ease"
        transform={`translateX(-${(currentIndex * 100) / categoriesToShow}%)`}
        gap="25px"
        whiteSpace="nowrap"
        justifyContent='center'
      >
        {categories.map((cat) => (
          <Box
            key={cat.id}
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap='20px'
            p="40px"
            cursor="pointer"
            borderRadius="md"
            bg={selectedCategory === cat.id ? "#DB4444" : "white"}
            color={selectedCategory === cat.id ? "white" : "black"}
            transition="background-color 0.3s ease"
            onClick={() => setSelectedCategory(cat.id)}
            border='1px solid grey'
            width='150px'
            _hover={{
              color : 'white',
              backgroundColor : '#DB4444'
            }}
          >
            {cat.icon}
            {cat.name}
          </Box>
        ))}
      </Flex>
      {scrollNeeded && (
        <>
          <IconButton
            onClick={prevSlide}
            icon={<FaArrowLeft />}
            aria-label="Previous"
            position="absolute"
            left="0"
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
          />
          <IconButton
            onClick={nextSlide}
            icon={<FaArrowRight />}
            aria-label="Next"
            position="absolute"
            right="0"
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
          />
        </>
      )}
    </Flex>
  );
};
