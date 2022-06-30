import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    font-size: 24px;
    font-weight: bold;
    border: 0;

    &:disabled {
      cursor: default;
    }
  }
`;
