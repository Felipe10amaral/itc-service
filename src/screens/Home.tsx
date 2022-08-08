import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import {ChatTeardropText, SignOut, ListNumbers} from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { dateFormat } from '../utils/firestoreDataFormat';
import { Loading } from '../components/Loading';


export function Home() {
  const {colors} = useTheme();
  
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('register');
  }

  function handleOpenDetails( orderId: string) {
    navigation.navigate('details', { orderId });
  }

  function handleOpenListOne() {
    navigation.navigate('listOne');
  } 

  function handleSignOut() {
    auth()
     .signOut()
     .catch( (error) => {
      console.log(error)
     })
  }

  useEffect( () => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('order')
      .where('status', '==', statusSelected)
      .onSnapshot( snapshot => {
        const data = snapshot.docs.map(doc => {
          const {service, description, status, created_at} = doc.data();
          
          return {
            id: doc.id,
            service,
            description,
            status,
            when: dateFormat(created_at)
          }
        });
        setOrders(data);
      setIsLoading(false);
      })
    return subscriber;
      
  }, [statusSelected])

  return (
    <VStack flex={1} pb={6} bg="gray.700" >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pt={12}
        pb={5}
        px={6}
        bg="gray.600"
      >
      <Logo /> 

      <IconButton 
        icon={ <ListNumbers size={26} color={colors.gray[300]} /> }
        onPress={handleOpenListOne}
      />  

      <IconButton 
        icon={ <SignOut size={26} color={colors.gray[300]} />}
        onPress={handleSignOut}
      />

      </HStack>
      
      <VStack flex={1} px={6} >
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"  
        >
          <Heading color="gray.100"> Solicitações </Heading>  
          <Text color="gray.300"> {orders.length} </Text>
        </HStack>   
       

      <HStack space={3} mb={8}>
        <Filter 
            type='open'
            title='em andamento'
            onPress={ () => setStatusSelected('open')}
            isActive={ statusSelected === 'open'}
        />

        <Filter 
            type='closed'
            title='finalizado'
            onPress={ () => setStatusSelected('closed')}
            isActive={ statusSelected === 'closed'}
        />
      </HStack>

      {
        isLoading ? <Loading /> :
        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={ ({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)} /> }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={ {paddingBottom: 100} }
          ListEmptyComponent={ () => (
            <Center>
                <ChatTeardropText color={colors.secondary[700]} size={40}/>
                <Text color="white" fontSize="xl" mt={6} textAlign="center" > 
                Não possui reparo {statusSelected === 'open' ? 'em aberto' : 'finalizado'} </Text>
            </Center>
          )}
        /> 
      }

      <Button title='Nova Solicitação' onPress={handleNewOrder}/>
     </VStack>  
    </VStack>
  );
}