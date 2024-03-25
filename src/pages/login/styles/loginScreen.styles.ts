import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const ContainerLoginScreen = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: gray;

`;

export const TitleLogin = styled(Title)`
  color: #006397;
`;

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1f1;
  padding: 0px 22px;
  width: 100%;
  max-width: 420px;
  height: 700px; 
  border-radius: 20px;
  margin: auto; 
`;

export const ContainerNotification = styled.div`
  width: 100%; 
  max-width: 490px;
  height:220px;
  background-color: white;
  border-radius: 20px;
  margin-top: 10px;
  margin: auto; 
  display:flex;
  flex-direction: column;
  gap:10px
`;


export const TitleNotice = styled.p`
  text-align: center;
  font-size: 30px;
  color: white;
  width: 100%;
  background-color: red;
`;

export const SpanNotice = styled.p`
  font-size: 20px;
  color: #006397;
  margin: 0 15px 
`;

export const Form = styled.form`
  width:100%;
`;

export const Errors = styled.p`
  color: red
`;

export const ImgStore = styled.img`
`;