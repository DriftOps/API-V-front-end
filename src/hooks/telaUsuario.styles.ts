// src/pages/telaUsuario.styles.tsx
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

export const Header = styled.View`
  background-color: #002D62;
  width: 100%;
  height: 190px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
`;

export const Logo = styled.Image`
  margin-top: 50px;
`;

export const ProfileContainer = styled.View`
  margin-top: 10px;
  width: 90%;
  padding: 20px;
`;

export const Avatar = styled.View`
  margin-bottom: 10px;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const InfoBox = styled.View`
  background-color: #002D62;
  border-radius: 30px;
  padding: 15px;
  margin-top: 9px;
  align-items: center;
`;

export const InfoText = styled.Text`
  color: #FFF;
  font-size: 20px;
`;

export const ReembolsoLabel = styled.Text`
  margin-top: 50px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const ReembolsoValor = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #002D62;
  text-align: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  border-top-width: 5px;
  border-top-color: #002D62;
  padding: 15px;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 20px;
`;
