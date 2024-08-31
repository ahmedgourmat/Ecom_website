import { Box } from '@chakra-ui/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { UserContext } from './context/AdminContext';
import { Main } from './pages/Main';

function App() {

  return (
    <Box>
      <UserContext>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Main />} />
        </Routes>
      </UserContext>
    </Box>
  );
}

export default App;
