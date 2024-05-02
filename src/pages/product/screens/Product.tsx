import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlex,
  DisplayFlexJustifyBetween,
  DisplayFlexJustifyCenter,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import Table from '../../../shared/components/table/Table';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { ProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import { useProduct } from '../hooks/useProduct';

const { Search } = Input;

const Product = () => {
  const {
    productsFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteProduct,
    handleEditProduct,
    handleCloseModalDelete,
    handleOpenModalDelete,
    loading,
  } = useProduct();

  const columns: ColumnsType<ProductType> = useMemo(
    () => [
      {
        title: 'Imagem',
        dataIndex: 'image',
        key: 'image',
        render: (_, product) => <img width={'130px'} src={product.image} />,
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        render: (_, product) => <CategoryColumn category={product.category} />,
      },
      {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, product) => (
          <LimitedContainer width={180}>
            <DisplayFlex>
              <Button
                margin="0px 16px 0px 0px"
                onClick={() => handleEditProduct(product.id)}
                icon={<EditOutlined />}
              >
                Editar
              </Button>
              <Button
                danger
                onClick={() => handleOpenModalDelete(product.id)}
                icon={<DeleteOutlined />}
              >
                Deletar
              </Button>
            </DisplayFlex>
          </LimitedContainer>
        ),
      },
    ],
    [],
  );

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PRODUTOS',
        },
      ]}
    >
      {loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Modal
            title="Atenção"
            open={openModalDelete}
            onOk={handleDeleteProduct}
            onCancel={handleCloseModalDelete}
            okText="Sim"
            cancelText="Cancelar"
          >
            <p>Tem certeza que deseja excluir esse produto?</p>
          </Modal>
          <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
            <LimitedContainer width={240}>
              <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
            </LimitedContainer>

            <LimitedContainer width={180}>
              <Button type="primary" onClick={handleOnClickInsert}>
                Adicionar Produtos
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyBetween>
          <Table columns={columns} dataSource={productsFiltered} />
        </>
      )}
    </Screen>
  );
};

export default Product;
