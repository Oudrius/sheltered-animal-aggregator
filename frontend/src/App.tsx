import { Box } from '@chakra-ui/react';
import './index.css';
import AnimalCards from './components/AnimalCards';
import Sorting from './components/Sorting';
import { ChangeEvent, useEffect, useState } from 'react';
import API_ROUTES from './config/api';

function App() {

  const [animalData, setAnimalData] = useState<AnimalDetails[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [shelters, setShelters] = useState<ShelterProps[]>([]);
  const [species, setSpecies] = useState<SpeciesProps[]>([]);
  const [filters, setFilters] = useState<Filters>({
    city: '',
    shelter: '',
    species: ''
  });

  useEffect(() => {
    
    const getAnimals = async () => {

      try {
        const url = API_ROUTES.Animals;
        const response = await fetch(url);
        const json = await response.json();
  
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
  
        setAnimalData(json);
      }
  
      catch (error) {
        console.error(error);
      }
    }
    getAnimals();
  }, [])

  useEffect(() => {
    const getCities = async () => {

      try {
        const url = API_ROUTES.Cities;
        const response = await fetch(url);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
        setCities(json);
      }

      catch (error) {
        console.log(error);
      }
    }
    getCities();
  }, [])

  useEffect(() => {
    const getShelters = async () => {

      try {
        const url = API_ROUTES.Shelters;
        const response = await fetch(url);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
        setShelters(json);
      }

      catch (error) {
        console.log(error);
      }
    }
    getShelters();
  }, [])

  useEffect(() => {
    const getSpecies = async () => {

      try {
        const url = API_ROUTES.Species;
        const response = await fetch(url);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
        setSpecies(json);
      }

      catch (error) {
        console.log(error);
      }
    }
    getSpecies();
  }, [])

  const handleFilters = (type: keyof Filters, value: string):void => {
      setFilters(prev => ({
        ...prev,
        [type]: value
      }));
      console.log(filters);
  }

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
        <Sorting cities={cities} shelters={shelters} species={species} onSelect={handleFilters}/>
      </Box>
      <Box flex='1' overflowY='auto'>
        <AnimalCards animalData={animalData}/>
      </Box>
    </Box>
  );
}

export default App;
