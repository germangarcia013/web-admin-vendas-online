import { useEffect, useState } from 'react';

import api from '../../../service/api';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';

export const useUser = () => {
  const { loading, setLoading } = useGlobalReducer();
  const { users, setUsers } = useUserReducer();
  const [usersFiltered, setUsersFiltered] = useState(users);

  useEffect(() => {
    const GetUsers = async () => {
      setLoading(true);
      const response = await api.get('/user/all', {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      });

      const { data } = response;

      setUsers(data);
      setLoading(false);
    };

    GetUsers();
  }, []);

  useEffect(() => {
    setUsersFiltered(users);
  }, [users]);

  const handleOnChangeSearch = (value: string) => {
    if (!value) {
      setUsersFiltered([...users]);
    } else {
      setUsersFiltered([...users.filter((user) => user.name.includes(value))]);
    }
  };

  return {
    users: usersFiltered,
    loading,
    handleOnChangeSearch,
  };
};
