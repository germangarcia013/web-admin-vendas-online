import { NavigateFunction, redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../../pages/login/routes';
import { UserTokenType } from '../../../pages/login/types/UserTokenType';
import { UserType } from '../../../pages/login/types/UserType';
import api from '../../../service/api';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const getUserInfoByToken = (): UserTokenType | undefined => {
  const token = getAuthorizationToken();
  const tokenSplited = token?.split('.');

  if (tokenSplited && tokenSplited.length > 1) {
    return JSON.parse(window.atob(tokenSplited[1]));
  }

  return undefined;
};

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  try {
    const user = await api.get<UserType>('/user', {
      headers: {
        Authorization: getAuthorizationToken(),
      },
    });
    if (!user) {
      return redirect(LoginRoutesEnum.LOGIN);
    }

    return null;
  } catch (error) {
    unsetAuthorizationToken();
  }
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(LoginRoutesEnum.LOGIN);
};
