import { useNavigate } from 'react-router-dom';

import Button from '../../../components/buttons/button/Button';
import Input from '../../../components/inputs/input/Input';
import Screen from '../../../components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../components/styles/display.styled';
import { LimitedContainer } from '../../../components/styles/limited.styled';
import { useInsertCategory } from '../hooks/useInsertCategory';
import { CategoryRoutesEnum } from '../routes';

const CategoryInsert = () => {
  const { name, categoryId, loading, handleOnChangeName, disabledButton, insertCategory } =
    useInsertCategory();
  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(CategoryRoutesEnum.CATEGORY);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'CATEGORIAS',
          navigateTo: CategoryRoutesEnum.CATEGORY,
        },
        {
          name: categoryId ? 'EDITAR CATEGORIA' : 'REGISTRAR CATEGORIA',
        },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={handleOnChangeName}
            value={loading ? 'carregando...' : name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleOnClickCancel} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={160}>
              <Button
                disabled={disabledButton}
                loading={loading}
                onClick={insertCategory}
                type="primary"
              >
                {loading ? loading : categoryId ? 'Salvar' : 'Registrar categoria'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default CategoryInsert;
