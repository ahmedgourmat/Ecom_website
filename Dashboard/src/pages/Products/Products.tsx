import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { CreateProduct } from './CreateProduct'
import { ProductList } from './ProductList'
import { ProductDetails } from './ProductDetails'

export const Products = () => {
  return (
    <Box
      p='20px 20px 20px 270px'
    >
        <Routes>
          <Route path='/create' element={<CreateProduct />} />
          <Route path='/' element={<ProductList />} />
          <Route path='/:id' element={<ProductDetails />} />
        </Routes>
    </Box>
  )
}
