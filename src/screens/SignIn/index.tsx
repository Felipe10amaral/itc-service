import React from 'react';
import { Container, Title } from './styles';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

export function SignIn() {
    return(
      <Container>
        <Logo width={RFValue(100)} height={100} />
        <Title> Acesse sua conta</Title>
      </Container>     
    );
}