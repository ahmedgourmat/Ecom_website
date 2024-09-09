import { Box } from '@chakra-ui/react'
import { SideBar } from '../components/SideBar'
import { Route, Routes } from 'react-router-dom'
import { Commands } from './Commands/Commands'
import { Products } from './Products/Products'
import { Colors } from '../Constant/Colors'
import { Contact } from './Contact/Contact'

export const Main = () => {
  return (
    <Box
        bgColor={Colors.text}
    >
        <SideBar/>
        <Routes>
            <Route path='/products/*' element={<Products />} />
            <Route path='/command/*' element={<Commands />} />
            <Route path='/contact/*' element={<Contact />} />
        </Routes>
    </Box>
  )
}
