import {useState} from 'react';
import { VStack, FlatList, Box } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { Button } from '../components/Button';
import {Header} from '../components/Header';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { OrderFirestoreDTO } from '../DTO/OrderFirestoreDTO';


export function ListOnePerson() {
  const [client, setClient] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function handleListPerson() {
    console.log(client)
     firestore()
      .collection('order')
      .where( 'name', '==', client)
      .onSnapshot( query => {
        const data = query.docs.map(doc => doc.data)
        console.log(data)
      })
      
      
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
        onChangeText={setClient}
      />
    </VStack> 

    

    <VStack p={6} mt={300} >
      <Button title='Listar' onPress={handleListPerson} /> 
    </VStack>

    </VStack>
  );
}