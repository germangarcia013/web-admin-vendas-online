import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../service/api';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { UserRoutesEnum } from '../routes';

export const useUserInsert = () => {
  const { setNotification, loading, setLoading } = useGlobalReducer();

  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<InsertUser>({
    cpf: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    if (user.cpf && user.email && user.name && user.password && user.phone) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      [name]: event.target.value,
    }));
  };

  const handleCancelInsert = () => {
    navigate(UserRoutesEnum.ADMIN);
  };

  const handleInsertAdmin = async () => {
    setLoading(true);
    await api.post(
      '/user/admin',
      {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        cpf: user.cpf,
      },
      {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      },
    );
    setLoading(false);
    navigate(UserRoutesEnum.ADMIN);
    setNotification('Sucesso!', 'success', 'Admin criado com sucesso!');
  };

  return {
    user,
    disabledButton,
    loading,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
  };
};
