import { LaptopOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconStore from '/icons-online-store.png';

import { CategoryRoutesEnum } from '../../../pages/category/routes';
import { ImgStore } from '../../../pages/login/styles/loginScreen.styles';
import { ProductRoutesEnum } from '../../../pages/product/routes';
import { UserRoutesEnum } from '../../../pages/user/routes';
import { ContainerLogoName, ContainerMenu, NameCompany } from './menu.style';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

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
    getItem('Clientes', <UserOutlined />, () => navigate(UserRoutesEnum.USER)),
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
        style={{ background: '#3253a8', width: 240 }}
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
