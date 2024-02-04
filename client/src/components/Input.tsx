import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: "email" | "text" | "password" | "number";
  pattern?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  pattern,
  type,
  required,
  ...rest
}) => (
  <StyledInput {...rest}>
    <input
      id={label?.replace(" ", "").toLowerCase()}
      name={label}
      value={value}
      type={type}
      pattern={pattern}
      onChange={onChange}
      required={required}
      {...rest}
    />
    {label && (
      <label htmlFor={label.replace(" ", "").toLowerCase()}>{label}</label>
    )}
  </StyledInput>
);

export default Input;

const StyledInput = styled.div`
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;

  label {
    position: absolute;
    left: 0;
    padding: 10px 15px;
    color: var(--secondary);
    pointer-events: none;
    transition: 0.4s;
  }
  input {
    padding: 10px 15px;
    background: var(--white);
    color: var(--black);
    border: 1px solid var(--primary);
    border-radius: 4px;
    width: 100%;
    font-size: 14px;
    transition: 0.6s;
    &:focus,
    &:hover {
      border-color: var(--tint3);
      outline: none;
    }
  }
  input:focus + label,
  input:valid + label {
    color: var(--grey);
    transform: translateY(-10px) translateX(10px);
    font-size: 12px;
    background: var(--white);
    padding: 2px;
    font-weight: 500;
    letter-spacing: 0.05rem;
  }
`;
