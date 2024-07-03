import { Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router-dom';

import Button from '../../../components/buttons/button/Button';
import Input from '../../../components/inputs/input/Input';
import InputMoney from '../../../components/inputs/inputMoney/InputMoney';
import Select from '../../../components/inputs/select/Select';
import Screen from '../../../components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../components/styles/display.styled';
import { LimitedContainer } from '../../../components/styles/limited.styled';
import { CategoryType } from '../../../shared/types/CategoryType';
import { useCategory } from '../../category/hooks/useCategory';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { ProductRoutesEnum } from '../routes';

const ProductInsert = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    product,
    loading,
    disabledButton,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
    handleOnClickCancel,
  } = useInsertProduct(productId);
  const { categories } = useCategory();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PRODUTOS',
          navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
          name: productId ? 'EDITAR PRODUTO' : 'ADICIONAR PRODUTO',
        },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'name')}
            value={loading ? 'Carregando...' : product.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'image')}
            value={loading ? 'Carregando...' : product.image}
            margin="0px 0px 16px 0px"
            title="Url imagem"
            placeholder="Url imagem"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'price', true)}
            value={loading ? 0 : product.price}
            margin="0px 0px 16px 0px"
            title="Preço"
            placeholder="Preço"
          />
          <Select
            defaultValue={`${product.categoryId || ''}`}
            title="Categoria"
            margin="0px 0px 16px 0px"
            onChange={handleChangeSelect}
            options={categories.map((category: CategoryType) => ({
              value: category.id,
              label: category.name,
            }))}
          />
          <TextArea
            value={loading ? 'Carregando...' : product.descricao}
            onChange={(event) => onChangeInput(event, 'descricao')}
            rows={4}
            placeholder="Descrição do produto"
          />
          <Divider />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleOnClickCancel}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={160}>
              <Button
                disabled={disabledButton}
                loading={loading}
                onClick={handleInsertProduct}
                type="primary"
              >
                {loading ? loading : productId ? 'Salvar' : 'Registrar produto'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default ProductInsert;
