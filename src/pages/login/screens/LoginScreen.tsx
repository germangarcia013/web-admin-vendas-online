import { Input as InputAntd } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconStore from '/icons-online-store.png';

import Button from '../../../components/buttons/button/Button';
import Input from '../../../components/inputs/input/Input';
import { BoxInput, TitleInput } from '../../../components/inputs/input/input.styles';
import api from '../../../service/api';
import { setAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import {
  ContainerLogin,
  ContainerLoginScreen,
  ContainerNotification,
  Errors,
  Form,
  ImgStore,
  SpanNotice,
  TitleLogin,
  TitleNotice,
} from '../styles/loginScreen.styles';

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

const LoginScreen = () => {
  const { setNotification, setUser, loading, setLoading } = useGlobalReducer();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors({
        ...errors,
        email: !email ? 'Campo usuário é obrigatório' : '',
        password: !password ? 'Campo senha é obrigatório' : '',
      });
      setTimeout(() => {
        setErrors({ ...errors, email: '', password: '' });
      }, 5000);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth', {
        email: email,
        password: password,
      });

      const { accessToken, user } = response.data;

      setUser(user);
      setAuthorizationToken(accessToken);
      navigate('/product');
    } catch (error) {
      if (error) {
        const err = error as ErrorResponse;
        const errorMessage = err.response.data.message;
        setNotification('Erro!', 'error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerLoginScreen>
      <ContainerNotification>
        <TitleNotice>Atenção!</TitleNotice>
        <SpanNotice>Para realizar login como Root inserir os seguintes dados:</SpanNotice>
        <SpanNotice>Usuário: root@root.com </SpanNotice>
        <SpanNotice>Senha: 12345678</SpanNotice>
      </ContainerNotification>

      <ContainerLogin>
        <ImgStore src={IconStore} />
        <TitleLogin level={2} type="secondary">
          LOGIN
        </TitleLogin>
        <Form onSubmit={handleSubmitLogin}>
          <Input
            size="large"
            title="USUÁRIO"
            margin="32px 0px 0px"
            onChange={handleEmail}
            status={errors.email ? 'error' : ''}
            value={email}
            placeholder="Digite nome do usuário"
          />
          {errors && <Errors> {errors.email}</Errors>}

          <BoxInput>
            <TitleInput>SENHA</TitleInput>
            <InputAntd.Password
              type="password"
              onChange={handlePassword}
              value={password}
              size="large"
              status={errors.password ? 'error' : ''}
              placeholder="Digite a senha"
            />
            {errors && <Errors> {errors.password}</Errors>}
          </BoxInput>
          <Button
            size="large"
            type="primary"
            loading={loading}
            htmlType="submit"
            margin="64px 0px 16px 0px"
          >
            {loading ? loading : 'Entrar'}
          </Button>
        </Form>
      </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
