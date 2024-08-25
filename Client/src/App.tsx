import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { Auth } from "./Pages/Auth/Auth"
import { Home } from "./Pages/Home"
import { Profile } from "./Pages/Profile"
import { Command } from "./Pages/Command"
import { Product } from "./Pages/Product"
import { About } from "./Pages/About"
import { Cart } from "./Pages/Cart"
import { NotFound } from "./Pages/NotFound"
import { NavBar } from "./Components/NavBar"
import { Contact } from "./Pages/Contact"


const App = () => {
  return (
    <Box>
      <NavBar />
      <Routes>
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/command' element={<Command />} />
        <Route path='/product' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  )
}

export default App