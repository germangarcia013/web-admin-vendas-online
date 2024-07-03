import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../../service/api';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { CategoryRoutesEnum } from '../routes';

export const useInsertCategory = () => {
  const { setNotification, loading, setLoading } = useGlobalReducer();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState(true);
  const { category, setCategory } = useCategoryReducer();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  useEffect(() => {
    if (!name) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [name]);

  useEffect(() => {
    const getCategoryID = async () => {
      setLoading(true);
      if (categoryId) {
        const response = await api.get(`/category/${categoryId}`, {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        });
        const { data } = response;
        setCategory(data);
        setLoading(false);
      } else {
        setLoading(false);
        setName('');
      }
    };

    getCategoryID();
  }, [categoryId]);

  const insertCategory = async () => {
    if (categoryId) {
      setLoading(true);

      await api.put(
        `/category/${categoryId}`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        },
      );

      setLoading(false);
      setNotification('Sucesso!', 'success', 'Categoria atualizado com sucesso!');
    } else {
      setLoading(true);
      await api.post(
        `/category`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        },
      );

      setLoading(false);
      setNotification('Sucesso!', 'success', 'Categoria cadastrado com sucesso!');
    }

    navigate(CategoryRoutesEnum.CATEGORY);
  };

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return {
    name,
    categoryId,
    disabledButton,
    handleOnChangeName,
    insertCategory,
    loading,
  };
};
