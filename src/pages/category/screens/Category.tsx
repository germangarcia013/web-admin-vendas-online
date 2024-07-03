import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';

import Button from '../../../components/buttons/button/Button';
import Loading from '../../../components/loading/Loading';
import Screen from '../../../components/screen/Screen';
import {
  DisplayFlex,
  DisplayFlexJustifyBetween,
  DisplayFlexJustifyCenter,
} from '../../../components/styles/display.styled';
import { LimitedContainer } from '../../../components/styles/limited.styled';
import Table from '../../../components/table/Table';
import { CategoryType } from '../../../shared/types/CategoryType';
import { useCategory } from '../hooks/useCategory';

const { Search } = Input;

const Category = () => {
  const {
    loading,
    categories,
    openModalDelete,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDeleteCategory,
    handleGoToEditCategory,
  } = useCategory();

  const columns: ColumnsType<CategoryType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Quantidade',
      dataIndex: 'amountProducts',
      key: 'amountProducts',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ações',
      dataIndex: '',
      width: 240,
      key: 'x',
      render: (_, category) => (
        <LimitedContainer width={180}>
          <DisplayFlex>
            <LimitedContainer margin="0px 16px 0px 0px" width={90}>
              <Button onClick={() => handleGoToEditCategory(category.id)} icon={<EditOutlined />}>
                Editar
              </Button>
            </LimitedContainer>
            {category.amountProducts <= 0 && (
              <Button
                danger
                onClick={() => handleOpenModalDelete(category.id)}
                icon={<DeleteOutlined />}
              >
                Deletar
              </Button>
            )}
          </DisplayFlex>
        </LimitedContainer>
      ),
    },
  ];

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'CATEGORIAS',
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
            onOk={handleConfirmDeleteCategory}
            onCancel={handleCloseModalDelete}
            okText="Sim"
            cancelText="Cancelar"
          >
            <p>Tem certeza que deseja excluir essa categoria?</p>
          </Modal>
          <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
            <LimitedContainer width={240}>
              <Search placeholder="Buscar categoria" onSearch={handleOnChangeSearch} enterButton />
            </LimitedContainer>

            <LimitedContainer width={180}>
              <Button type="primary" onClick={handleOnClickCategory}>
                Adicionar Categoria
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyBetween>

          <Table columns={columns} dataSource={categories} />
        </>
      )}
    </Screen>
  );
};

export default Category;
