import { RouteObject } from 'react-router-dom';

import User from './screens/User';
import UserInsert from './screens/UserInsert';

export enum UserRoutesEnum {
  ADMIN = '/admin',
  ADMIN_INSERT = '/admin/insert',
}

export const userScreens: RouteObject[] = [
  {
    path: UserRoutesEnum.ADMIN,
    element: <User />,
  },
  {
    path: UserRoutesEnum.ADMIN_INSERT,
    element: <UserInsert />,
  },
];
