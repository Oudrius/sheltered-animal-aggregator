import { SimpleGrid, Card, CardBody, CardFooter, Heading, Text, Button, Image, Stack, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import API_ROUTES from '../config/api';
import './styles/form.css'

function AnimalCards() {

  const [animalData, setAnimalData] = useState<AnimalDetails[]>([]);

  useEffect(() => {
    
    const getAnimals = async () => {

      try {
        const url = API_ROUTES.Animals;
  
        const response = await fetch(url);
        const json = await response.json();
  
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
  
        else {
          setAnimalData(json);
        }
      }
  
      catch (error) {
        console.error(error);
      }
    }

    getAnimals();
  }, [])

  useEffect(() => {
    console.log(animalData);
  }, [animalData])

  return (
    <SimpleGrid spacing={5} columns={3} justifyItems='stretch' gridRowGap={5} paddingX='20px'>
      {animalData.map((item, index) => {
        return (
          <Card
            key={index}
            maxW='md'
            borderRadius='xl'
            justifyContent='center'
            transition='opacity 0.3s ease-in-out'
            _hover={
              {
                opacity: '0.7',
                cursor: 'pointer',
              }
            }
          >
            <CardBody justifyContent='center' p={0}>
              <Image
                src={item.picture}
                w='100%'
                h='400px'
                borderRadius='xl'
                objectFit='cover'
              />
              <Stack spacing='3' padding={5} gap={10}>
                <Heading size='lg' textAlign='center'>{item.name}</Heading>
                <Flex justifyContent='space-between' fontSize='18'>
                  <Text>Lytis: {item.sex}</Text>
                  <Text>Amžius: {item.age}</Text>
                </Flex>
                <Text fontSize={16} h='100px'>
                  {item.description}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        )
      })}
    </SimpleGrid>
  )
}

export default AnimalCards;