import { Box } from '@chakra-ui/react'
import { SideBar } from '../components/SideBar'
import { Route, Routes } from 'react-router-dom'
import { Commands } from './Commands/Commands'
import { Products } from './Products/Products'
import { Colors } from '../Constant/Colors'

export const Main = () => {
  return (
    <Box
        bgColor={Colors.text}
    >
        <SideBar/>
        <Routes>
            <Route path='/products/*' element={<Products />} />
            <Route path='/command/*' element={<Commands />} />
        </Routes>
    </Box>
  )
}
