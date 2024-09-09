import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { Auth } from "./Pages/Auth"
import { Home } from "./Pages/Home"
import { Profile } from "./Pages/Profile"
import { Command } from "./Pages/Command"
import { Product } from "./Pages/Product"
import { Cart } from "./Pages/Cart"
import { NotFound } from "./Pages/NotFound"
import { NavBar } from "./Components/NavBar"
import { Contact } from "./Pages/Contact"
import { Footer } from "./Components/Footer"
import { Saved } from "./Pages/Saved"


const App = () => {
  return (
    <Box >
      <NavBar />
      <Box
        pt='79px'
      >
        <Routes>
          <Route path='/auth/*' element={<Auth />} />
          <Route path='/' element={<Home />} />
          <Route path='/profile/*' element={<Profile />} />
          <Route path='/command' element={<Command />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App