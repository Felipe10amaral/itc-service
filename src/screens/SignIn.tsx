import React, { useState } from 'react';
import { Envelope, Key} from 'phosphor-react-native';
import { Icon, HStack, Heading, VStack, useTheme } from 'native-base';
import {Input} from '../components/Input';

import Logo from '../assets/logo.svg' ;
import { Button } from '../components/Button';




export function SignIn() {
  const {colors} = useTheme();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {}
  
    return(
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24} >
        <Logo  />
        
        <Heading 
          color="gray.100" 
          fontSize="xl"
          mt={20}
          mb={6} 
        > 
          Acesse sua conta
        </Heading>
        
        <Input 
          onChangeText={setName}

          placeholder='Email'
          mb={4} 
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4} /> } 
          _focus={{
            borderWidth: 1,
            borderColor: "red.500",
            bg: "gray.700"
          }}
        />
        
        <Input 
          onChangeText={setPassword}

          mb={8}
          placeholder='Senha' 
          InputLeftElement={ <Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          _focus={{
            borderWidth: 1,
            borderColor: "red.500",
            bg: "gray.700"
          }} 
        />

        <Button title='Entrar' w="full" />

      </VStack>     
    );
}