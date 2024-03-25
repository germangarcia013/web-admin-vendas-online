import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { useUserInsert } from '../hooks/useUserInsert';
import { UserRoutesEnum } from '../routes';
import { Divider, Input as InputAntd } from 'antd';
import { BoxInput, TitleInput } from '../../../shared/components/inputs/input/input.styles';

const UserInsert = () => {
  const {
    user,
    disabledButton,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
    loading } = useUserInsert();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'USUÁRIOS',
          navigateTo: UserRoutesEnum.USER,
        },
        {
          name: 'CADASTRAR USUÁRIO',
        },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            value={user.name}
            onChange={(event) => handleOnChangeInput(event, 'name')}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            value={user.phone}
            onChange={(event) => handleOnChangeInput(event, 'phone')}
            margin="0px 0px 16px 0px"
            title="Telefone"
            placeholder="Telefone"
          />
          <Input
            value={user.email}
            onChange={(event) => handleOnChangeInput(event, 'email')}
            margin="0px 0px 16px 0px"
            title="Email"
            placeholder="Email"
          />
          <Input
            value={user.cpf}
            onChange={(event) => handleOnChangeInput(event, 'cpf')}
            margin="0px 0px 16px 0px"
            title="CPF"
            placeholder="CPF"
          />
          <BoxInput>
            <TitleInput>Senha</TitleInput>
            <InputAntd.Password
              value={user.password}
              onChange={(event) => handleOnChangeInput(event, 'password')}
              placeholder="Senha"
            />
          </BoxInput>
          <Divider />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleCancelInsert} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={160}>
              <Button disabled={disabledButton} onClick={handleInsertAdmin} type="primary" loading={loading}>
                {loading ? loading : 'Cadastrar Admin'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default UserInsert;
