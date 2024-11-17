import { Box } from '@chakra-ui/react';
import './index.css';
import AnimalCards from './components/AnimalCards';
import Sorting from './components/Sorting';

function App() {
  return (
    <Box
      className="App"
      w='1350px'
      bg='rgb(255, 255, 255, 0.3)'
      py='60px'
      px='40px'
      border='1px solid  rgb(255, 255, 255, 0.5)'
      borderRadius='40px'
      minH='calc(100vh - 60px)'
      display='flex'
      flexDirection='column'
    >
      <Box flex='0'>
        <Sorting />
      </Box>
      <Box flex='1' overflowY='auto'>
        <AnimalCards/>
      </Box>
    </Box>
  );
}

export default App;
