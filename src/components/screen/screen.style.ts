import styled from 'styled-components';

export const ScreenContainer = styled.div`
  background-color: white;
  padding: 32px;
  margin: 32px;
  width: calc(100% - 368px);
  margin-left: auto;

  @media (max-width: 1440px) {
    padding: 10px 32px;
    margin: 20px 32px;
    width: calc(100% - 300px);
    margin-left: auto;
  }
`;
