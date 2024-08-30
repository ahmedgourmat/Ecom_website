import { Box } from '@chakra-ui/react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Products } from './pages/Products';
import { Commands } from './pages/Commands';
import { Login } from './pages/Login';
import { UserContext } from './context/AdminContext';
import { SideBar } from './components/SideBar';

function App() {
  const location = useLocation();

  const showSidebar = location.pathname === '/products' || location.pathname === '/command';

  return (
    <Box>
      <UserContext>
        {showSidebar && <SideBar />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/products' element={<Products />} />
          <Route path='/command' element={<Commands />} />
        </Routes>
      </UserContext>
    </Box>
  );
}

export default App;
