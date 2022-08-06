import { useEffect, useState } from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';

import { VStack, Text  } from 'native-base';
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTO/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDataFormat';

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


  const route = useRoute();
  const {orderId} = route.params as RouteParams;

  useEffect(() => {
    firestore()
     .collection<OrderFirestoreDTO>('order')
     .doc(orderId)
     .get()
     .then((doc) => {
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
      })
     })
  }, [])

  return (
    <VStack flex={1} bg="gray.700">
      <Header title='Solicitação' />

      <Text color="white"> { orderId}</Text>
    </VStack>
  );
}