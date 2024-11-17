import { Flex, Select, Box, Heading } from "@chakra-ui/react"

const Sorting = () => {
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
        <Select placeholder='Miestas' size='md' bg={"white"} flex={1}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Select placeholder='Prieglauda' size='md' bg={"white"} flex={1}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Select placeholder='Gyvūnas' size='md' bg={"white"} flex={1}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Flex>
    </Box>

  );
}

export default Sorting;