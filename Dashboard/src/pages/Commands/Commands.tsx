import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { AllCommand } from './AllCommand'
import { Confirmed } from './Confirmed'
import { Unconfirmed } from './Unconfirmed'
import { Retour } from './Retour'

export const Commands = () => {
  return (
    <Box
      p='20px 20px 20px 270px'
    >
        <Routes>
          <Route path='/' element={<AllCommand/>} />
          <Route path='/confirmed' element={<Confirmed/>} />
          <Route path='/unconfirmed' element={<Unconfirmed/>} />
          <Route path='/retour' element={<Retour/>} />
        </Routes>
    </Box>
  )
}
