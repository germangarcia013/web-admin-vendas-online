import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../service/api';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { CategoryRoutesEnum } from '../routes';

export const useCategory = () => {
  const { setNotification, loading, setLoading } = useGlobalReducer();
  const { categories, setCategories } = useCategoryReducer();
  const [categoryIdDelete, setCategoryIdDelete] = useState<number | undefined>();
  const [categoriesFiltered, setCategoriesFiltered] = useState(categories);
  const navigate = useNavigate();

  useEffect(() => {
    setCategoriesFiltered([...categories]);
  }, [categories]);

  useEffect(() => {
    setLoading(true);
    const getCategory = async () => {
      try {
        const response = await api.get('/category', {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        });

        const { data } = response;

        setLoading(false);
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, []);

  const handleOnChangeSearch = (value: string) => {
    if (!value) {
      setCategoriesFiltered([...categories]);
    } else {
      setCategoriesFiltered([
        ...categoriesFiltered.filter((category) =>
          category.name.toUpperCase().includes(value.toUpperCase()),
        ),
      ]);
    }
  };

  const handleOnClickCategory = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  const handleOpenModalDelete = (categoryId: number) => {
    setCategoryIdDelete(categoryId);
  };

  const handleCloseModalDelete = () => {
    setCategoryIdDelete(undefined);
  };

  const handleConfirmDeleteCategory = async () => {
    try {
      setLoading(true);
      await api.delete(`/category/${categoryIdDelete}`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      });

      setNotification('Sucesso!', 'success', 'Categoria deletada com sucesso!');
      setCategoryIdDelete(undefined);

      const response = await api.get('/category', {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      });

      const { data } = response;

      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToEditCategory = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  return {
    categories: categoriesFiltered,
    openModalDelete: !!categoryIdDelete,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDeleteCategory,
    handleGoToEditCategory,
    loading,
  };
};
