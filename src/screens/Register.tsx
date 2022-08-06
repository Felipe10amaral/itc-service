import { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService ] = useState('');
  const [description, setDescription ] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if(!service || !description) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }

    setIsLoading(true);

    firestore()
      .collection('order')
      .add({
        service,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then( () => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso");
        navigation.goBack();
      })
      .catch( (error) => {
        console.log(error.code);
        setIsLoading(false);
        return Alert.alert("Erro", "Não foi possivel cadastrar a ordem de serviço")
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title='Nova Solicitação'/>

      <Input 
        mt={4}
        placeholder="ID do Serviço"
        onChangeText={setDescription}
      />

      <Input 
        placeholder='Descrição do problema'
        flex={1}
        mt={5}
        multiline
        textAlignVertical='top'
        onChangeText={setService}
      />

      <Button 
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}