import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserType } from '../../../pages/login/types/UserType';
import { NotificationEnum } from '../../../shared/types/NotificationType';
import { useAppSelector } from '../../hooks';
import { setNotificationAction, setUserAction } from '.';

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user, notification } = useAppSelector((state) => state.globalReducer);
  const [loading, setLoading] = useState(false);

  const setNotification = (message: string, type: NotificationEnum, description?: string) => {
    dispatch(
      setNotificationAction({
        message,
        type,
        description,
      }),
    );
  };
  const setUser = (user: UserType) => {
    dispatch(setUserAction(user));
  };

  return {
    user,
    notification,
    setNotification,
    setUser,
    setLoading,
    loading,
  };
};
