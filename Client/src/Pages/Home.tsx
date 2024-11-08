import { Box } from "@chakra-ui/react"
import { SideBar } from "../Components/Home/SideBar"
import { Advertisment } from "../Components/Home/Advertisment"
import BestSellingProduct from "../Components/Home/BestSellingProduct"
import { Categories } from "../Components/Home/Categories"
import { OurProduct } from "../Components/Home/OurProduct"


export const Home = () => {
  return (
    <Box
      p='0px 150px'
    >
      <Box
        display='flex'
        alignItems='center'
        mb='40px'
      >
        <SideBar/>
        <Advertisment/>
      </Box>
      <BestSellingProduct/>
      <Categories/>
      <OurProduct/>
    </Box>
  )
}
