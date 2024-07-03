import type { Router as RemixRouter } from '@remix-run/router';
import { useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { categoryScreens } from './pages/category/routes';
import { firstScreenRoutes } from './pages/firstScreen/routes';
import { loginRoutes } from './pages/login/routes';
import { productScreens } from './pages/product/routes';
import { userScreens } from './pages/user/routes';
import api from './service/api';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useNotification } from './shared/hooks/useNotification';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...productScreens,
  ...categoryScreens,
  ...firstScreenRoutes,
  ...userScreens,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser, setLoading } = useGlobalReducer();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      setLoading(true);
      const getUser = async () => {
        const response = await api.get('/user', {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        });

        const { data } = response;
        setUser(data);
        setLoading(false);
      };

      getUser();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
