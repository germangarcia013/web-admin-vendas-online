import { LaptopOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
// import { Menu as MenuAntd } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconStore from '/icons-online-store.png';

import { CategoryRoutesEnum } from '../../pages/category/routes';
import { ImgStore } from '../../pages/login/styles/loginScreen.styles';
import { ProductRoutesEnum } from '../../pages/product/routes';
import { UserRoutesEnum } from '../../pages/user/routes';
import { UserTypeEnum } from '../../shared/enums/userType.enum';
import { getUserInfoByToken } from '../../shared/functions/connection/auth';
import { ContainerLogoName, ContainerMenu, MenuAntd, NameCompany } from './menu.style';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');
  const userToken = useMemo(() => getUserInfoByToken(), []);

  function getItem(label: React.ReactNode, icon?: React.ReactNode, onClick?: () => void): MenuItem {
    return {
      icon,
      label,
      onClick,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('Produtos', <LaptopOutlined />, () => navigate(ProductRoutesEnum.PRODUCT)),
    getItem('Categorias', <ProfileOutlined />, () => navigate(CategoryRoutesEnum.CATEGORY)),
    userToken?.typeUser === UserTypeEnum.User
      ? null
      : getItem('Admin', <UserOutlined />, () => navigate(UserRoutesEnum.ADMIN)),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <ImgStore width={30} src={IconStore} />
        <NameCompany>Vendas Online</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        onClick={onClick}
        theme="dark"
        items={items}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
      />
    </ContainerMenu>
  );
};

export default Menu;
