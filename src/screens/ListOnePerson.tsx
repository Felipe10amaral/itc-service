import {useState} from 'react';
import { VStack, FlatList, Box } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { Button } from '../components/Button';
import {Header} from '../components/Header';
import { Input } from '../components/Input';


export function ListOnePerson() {
  const [listPerson, setListPerson] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function handleListPerson() {

    const subscriber = firestore()
      .collection('order')
      .doc(listPerson)
      

  }

  return (
    <VStack flex={1} bg="gray.600" >
      <Box px={6} bg="gray.600">
        <Header title='Listar dados do cliente' />
      </Box> 
        
    <VStack p={6} >
      <Input 
        placeholder='Digite o nome do cliente'
        mt={4}
        onChangeText={setListPerson}
      />
    </VStack> 

    <VStack p={6} mt={300} >
      <Button title='Listar' onPress={handleListPerson} /> 
    </VStack>

    </VStack>
  );
}