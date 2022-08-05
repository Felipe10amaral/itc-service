import React, { useState } from 'react';
import { Envelope, Key} from 'phosphor-react-native';
import { Icon, Heading, VStack, useTheme } from 'native-base';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import {Input} from '../components/Input';

import Logo from '../assets/logo.svg' ;
import { Button } from '../components/Button';




export function SignIn() {
  const {colors} = useTheme();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    if(!email || !password) {
      return Alert.alert("Erro", "Email ou senha incorretos");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);

        if(error.code === 'auth/invalid-email') {
          return Alert.alert("Erro", "Email ou senha invalidos")
        }

        if(error.code === 'auth/user-not-found') {
          return Alert.alert("Erro", "Email ou senha invalidos")
        }

        
        return Alert.alert("Erro", "Email ou senha invalidos")
        
      }) 
  }
  
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
          onChangeText={setEmail}

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

        <Button 
          title='Entrar' 
          w="full" 
          onPress={handleSignIn}
          isLoading={isLoading}
        />

      </VStack>     
    );
}