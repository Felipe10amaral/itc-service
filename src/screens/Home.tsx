import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import {ChatTeardropText, SignOut} from 'phosphor-react-native';
import { useState } from 'react';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';


export function Home() {
  const {colors} = useTheme();
  
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    
   ]);

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
        icon={ <SignOut size={26} color={colors.gray[300]} />}
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
          <Text color="gray.300"> 3 </Text>
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

      <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        renderItem={ ({item}) => <Order data={item} /> }
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

      <Button title='Nova Solicitação'/>
     </VStack>  
    </VStack>
  );
}