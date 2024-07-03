import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../service/api';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { ProductType } from '../../../shared/types/ProductType';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { ProductRoutesEnum } from '../routes';

export const useProduct = () => {
  const { loading, setLoading, setNotification } = useGlobalReducer();
  const [productIdDelete, setProductIdDelete] = useState<number | undefined>();
  const { products, setProducts } = useProductReducer();
  const [productsFiltered, setProdutsFiltered] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProdutsFiltered([...products]);
  }, [products]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get('/product', {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  const handleOnClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setProdutsFiltered([...products]);
    } else {
      setProdutsFiltered([...productsFiltered.filter((product) => product.name.includes(value))]);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);

      await api.delete(`/product/${productIdDelete}`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      });

      setProductIdDelete(undefined);
      setNotification('Sucesso!', 'success', 'Produto excluido com sucesso!');

      const response = await api.get('/product', {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleCloseModalDelete = () => {
    setProductIdDelete(undefined);
  };

  const handleOpenModalDelete = (productId: number) => {
    setProductIdDelete(productId);
  };

  return {
    productsFiltered,
    openModalDelete: !!productIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteProduct,
    handleEditProduct,
    handleCloseModalDelete,
    handleOpenModalDelete,
    loading,
  };
};
