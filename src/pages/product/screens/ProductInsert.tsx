import { Divider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import Select from '../../../shared/components/inputs/select/Select';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
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
    isEdit,
    loadingProduct,
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
          name: 'ADICIONAR PRODUTO',
        },
      ]}
    >
      {loading || loadingProduct ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <DisplayFlexJustifyCenter>
          <LimitedContainer width={400}>
            <Input
              onChange={(event) => onChangeInput(event, 'name')}
              value={product.name}
              margin="0px 0px 16px 0px"
              title="Nome"
              placeholder="Nome"
            />
            <Input
              onChange={(event) => onChangeInput(event, 'image')}
              value={product.image}
              margin="0px 0px 16px 0px"
              title="Url imagem"
              placeholder="Url imagem"
            />
            <InputMoney
              onChange={(event) => onChangeInput(event, 'price', true)}
              value={product.price}
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
                value: `${category.id}`,
                label: `${category.name}`,
              }))}
            />
            <TextArea
              value={product.descricao}
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
                  loading={loading}
                  disabled={disabledButton}
                  onClick={handleInsertProduct}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Registrar produto'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </DisplayFlexJustifyCenter>
      )}
    </Screen>
  );
};

export default ProductInsert;
