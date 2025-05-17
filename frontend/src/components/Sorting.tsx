import { Flex, Select, Box, Heading } from "@chakra-ui/react"
import { ChangeEvent } from "react";

const Sorting = ({ cities, shelters, species, onSelect }: SortingProps) => {

  return (
    <Box
      bg='rgb(255, 255, 255, 0.4)'
      border='1px solid  rgb(255, 255, 255, 0.5)'
      p={5} h='fit-content'
      mb={10}
      borderRadius={10}
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignContent='center'
      gap={10}
    >
      <Heading alignContent='center' fontSize={24}>Filtrai</Heading>
      <Flex gap={10} flex={1}>
        <Select placeholder='Miestas' size='md' bg={"white"} flex={1} onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelect('city', e.target.value)}
          defaultValue="">
          {cities.map((city, index) => {
            return (
              <option key={index} value={city.name}>{city.name}</option>
            );
          })}
        </Select>
        <Select placeholder='Prieglauda' size='md' bg={"white"} flex={1}>
          {shelters.map((shelter, index) => {
            return (
              <option key={index} value={shelter.name}>{shelter.name}</option>
            )
          })}
        </Select>
        <Select placeholder='Gyvūnas' size='md' bg={"white"} flex={1}>
          {species.map((species, index) => {
            return (
              <option key={index} value={species.name}>{species.name}</option>
            )
          })}
        </Select>
      </Flex>
    </Box>

  );
}

export default Sorting;