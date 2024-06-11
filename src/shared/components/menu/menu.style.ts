import { Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const ContainerMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #3253a8;

  width: 240px;

  -webkit-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  -moz-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);

  @media (max-width: 1400px) {
    width: 200px;
  }
`;

export const ContainerLogoName = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 17px;
  -webkit-box-shadow: -2px 6px 4px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: -2px 6px 4px 0px rgba(0, 0, 0, 0.47);
  box-shadow: -2px 6px 4px 0px rgba(0, 0, 0, 0.47);
`;

export const NameCompany = styled(Text)`
  color: white;
`;
