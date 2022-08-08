import { VStack, HStack, Box } from 'native-base';


import {Header} from '../components/Header';


export function ListOnePerson() {
  

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title='Listar dados do cliente' />
      </Box> 
        <HStack>

        </HStack>

    </VStack>
  );
}