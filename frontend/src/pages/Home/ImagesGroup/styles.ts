import styled from 'styled-components';

export const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 50px;
  margin-top: 50px;
`;

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-self: center;
  width: 420px;
  height: fit-content;
  border-radius: 8px;
  background-color: white;

  -webkit-box-shadow: 5px 5px 14px 2px rgba(0, 0, 0, 0.36);
  box-shadow: 5px 5px 14px 2px rgba(0, 0, 0, 0.36);
`;
