import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SignIn } from './src/screens/SignIn';
import {useFonts ,Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';

import {THEME} from './src/style/theme';
import { Loading } from './src/components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      { fontsLoaded ? <SignIn /> : <Loading/> }
    </NativeBaseProvider>
  );
}
