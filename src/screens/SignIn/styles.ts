import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../style/theme";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape };
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.medium};
`;