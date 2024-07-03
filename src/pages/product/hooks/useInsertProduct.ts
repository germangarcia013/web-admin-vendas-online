import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../service/api';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { ProductRoutesEnum } from '../routes';

const DEFAULT_PRODUCT = {
  name: '',
  price: 0,
  image: '',
  descricao: '',
};

export const useInsertProduct = (productId?: string) => {
  const navigate = useNavigate();
  const { setNotification, loading, setLoading } = useGlobalReducer();
  const [isEdit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [product, setProduct] = useState<InsertProduct>(DEFAULT_PRODUCT);

  useEffect(() => {
    if (
      product.name &&
      product.categoryId &&
      product.image &&
      product.price > 0 &&
      product.descricao
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [product]);

  useEffect(() => {
    if (productId) {
      const findProduct = async () => {
        setLoading(true);

        const response = await api.get(`/product/${productId}`, {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        });

        const { data } = response;

        setProduct({
          name: data.name,
          price: data.price,
          image: data.image,
          descricao: data.descricao,
          categoryId: data.category.id,
        });
        setLoading(false);
      };

      findProduct();
    } else {
      setProduct(DEFAULT_PRODUCT);
    }
  }, [productId]);

  const handleOnClickCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
  };

  const handleInsertProduct = async () => {
    setLoading(true);
    try {
      if (productId) {
        await api.put(
          `/product/${productId}`,
          {
            categoryId: product.categoryId,
            name: product.name,
            price: product.price,
            image: product.image,
            descricao: product.descricao,
          },
          {
            headers: {
              Authorization: getAuthorizationToken(),
            },
          },
        );
        setLoading(false);
        setNotification('Sucesso!', 'success', 'Produto atualizado com sucesso!');
      } else {
        setLoading(true);

        await api.post(
          `/product`,
          {
            categoryId: product.categoryId,
            name: product.name,
            price: product.price,
            image: product.image,
            descricao: product.descricao,
          },
          {
            headers: {
              Authorization: getAuthorizationToken(),
            },
          },
        );
        setLoading(false);
        setNotification('Sucesso!', 'success', 'Produto criado!');
      }
      navigate(ProductRoutesEnum.PRODUCT);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    product,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
    handleOnClickCancel,
    productId,
  };
};
