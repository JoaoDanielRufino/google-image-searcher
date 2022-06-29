import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
  object-fit: contain;
`;

export const ErrorImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;

  span {
    font-size: 20px;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  padding: 8px;

  a {
    margin-top: 4px;
    overflow-wrap: break-word;
  }
`;

export const Title = styled.span`
  margin-bottom: 8px;
`;

export const FileFormat = styled.span`
  color: gray;
`;
