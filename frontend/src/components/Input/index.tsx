import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

const Input: React.FC<Props> = ({ labelText, ...props }) => {
  return (
    <Container htmlFor={props.id}>
      {labelText}
      <input {...props} />
    </Container>
  );
};

export default Input;
