import { useEffect, useState } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText, User } from 'phosphor-react-native';

import { VStack, Text, HStack, useTheme, ScrollView, Box  } from 'native-base';
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTO/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDataFormat';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}


export function Details() {
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');

  const {colors} = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const {orderId} = route.params as RouteParams;

  useEffect( () => {
    firestore()
     .collection<OrderFirestoreDTO>('order')
     .doc(orderId)
     .get()
     .then( (doc) => {
      const {service, description, status, created_at, closed_at, solution} = doc.data();

      const closed = closed_at ? dateFormat(closed_at) : null;

     setOrder({
        id: doc.id,
        service,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed
      });
      
      setIsLoading(false);

      console.log({
        id: doc.id,
        service,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed
      })
     })
  }, [])

  if(isLoading) {
    return <Loading />
  }

  function handleOrderClose() {
    if(!solution) {
      return Alert.alert("Solicita????o", "Informe a solu????o para encerrar a solicita????o")
    }

    firestore()
      .collection<OrderFirestoreDTO>('order')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then( () => {
        Alert.alert("Solicita????o", "Solicita????o Encerrada")
        navigation.goBack();
      })
      .catch( (error) => {
        console.log(error);
        Alert.alert("Solicita????o", "N??o foi possivel encerrar a sua solicita????o");
      });
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title='Solicita????o' />
      </Box>  

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
         order.status === 'closed' 
          ? <CircleWavyCheck size={22} color={colors.white} />
          : <Hourglass size={22} color={colors.red[500]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'open' ? colors.primary[700] : colors.white}
          ml={2}
        >
          { order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
        </Text>
      </HStack>

      <ScrollView
        mx={5}
        showsVerticalScrollIndicator={false}
      >
        <CardDetails 

          title={order.description}
          description={`Reparo ${order.service}`}
          icon={User}
          footer={order.when}
        />

        <CardDetails 
          title='Descri????o do Problema'
          description={`Reparo ${order.service}`}
          icon={ClipboardText}
          
        />
        <CardDetails 
          title='Solu????o'
          icon={CircleWavyCheck}
          footer={order.closed && ` Finalizado em ${order.closed}`}
          description={order.solution}
        >
          {
            order.status === 'open' &&
            <Input 
              bg="gray.600" 
              placeholder='Descreva a Solu????o' 
              onChangeText={setSolution}
              multiline
              h={24}
              textAlignVertical="top"
            />
          }
        </CardDetails>
      </ScrollView>

      {
        order.status === 'open' && <Button title='Encerrar solicita????o' m={5} onPress={handleOrderClose}/>
      }
    </VStack>
  );
}