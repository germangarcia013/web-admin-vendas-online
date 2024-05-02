import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { ProductRoutesEnum } from '../routes';

const DEFAULT_PRODUCT = {
  name: '',
  price: 0,
  image: '',
  descricao: '',
};

export const useInsertProduct = (productId?: string) => {
  const navigate = useNavigate();
  const [loadingProduct, setLoadingProduct] = useState(false);
  const { request, loading } = useRequests();
  const { product: productReducer, setProduct: setProductReducer } = useProductReducer();
  const [isEdit, setIsEdit] = useState(false);
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
    if (productReducer) {
      setProduct({
        name: productReducer.name,
        price: productReducer.price,
        image: productReducer.image,
        descricao: productReducer.descricao,
        categoryId: productReducer.category?.id,
      });
    }
  }, [productReducer]);

  useEffect(() => {
    const findProduct = async () => {
      setLoadingProduct(true);
      await request(
        URL_PRODUCT_ID.replace('{productId}', productId || ''),
        MethodsEnum.GET,
        setProductReducer,
      );
      setLoadingProduct(false);
    };

    if (productId) {
      setIsEdit(true);
      findProduct();
    } else {
      setProductReducer(undefined);
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
    if (productId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await request(
        URL_PRODUCT_ID.replace('{productId}', productId),
        MethodsEnum.PUT,
        undefined,
        product,
        'Produto modificado!',
      );
    } else {
      await request(URL_PRODUCT, MethodsEnum.POST, undefined, product, 'Produto criado!');
    }
    navigate(ProductRoutesEnum.PRODUCT);
  };

  return {
    product,
    loading,
    disabledButton,
    isEdit,
    loadingProduct,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
    handleOnClickCancel,
  };
};
