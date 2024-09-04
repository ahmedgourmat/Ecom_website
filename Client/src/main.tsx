import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import { UserContext } from './Context/LoginContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ChakraProvider>
      <UserContext>
        <App />
      </UserContext>
    </ChakraProvider>
  </BrowserRouter>,
)
