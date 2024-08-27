import { Box } from "@chakra-ui/react"
import { SideBar } from "../Components/Home/SideBar"
import { Advertisment } from "../Components/Home/Advertisment"
import BestSellingProduct from "../Components/Home/BestSellingProduct"


export const Home = () => {
  return (
    <Box
      p='0px 150px'
    >
      <Box
        display='flex'
        alignItems='center'
      >
        <SideBar/>
        <Advertisment/>
      </Box>
      <BestSellingProduct/>
    </Box>
  )
}
