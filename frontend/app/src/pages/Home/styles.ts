import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding-bottom: 80px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  button {
    width: fit-content;
    padding: 8px;
    margin-top: 30px;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 16px;

    &:not(:disabled):hover {
      filter: brightness(0.9);
    }

    &:disabled {
      cursor: default;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  align-self: center;
  margin-top: 120px;
`;
