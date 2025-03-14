import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  label: string;
  value: string | number;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "email" | "text" | "password" | "number";
  pattern?: string;
  required?: boolean;
  errormessage?: string;
  disabled?: boolean;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  pattern,
  type,
  required,
  errormessage,
  disabled,
  multiline = false,
}) => (
  <StyledInput errormessage={errormessage}>
    {multiline ? (
      <textarea
        id={label?.replace(/\s+/g, "").toLowerCase()}
        name={label}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        disabled={disabled}
      />
    ) : (
      <input
        id={label?.replace(/\s+/g, "").toLowerCase()}
        name={label}
        value={value}
        type={type}
        pattern={pattern}
        onChange={onChange}
        required={required}
        placeholder=" "
        disabled={disabled}
      />
    )}
    <label htmlFor={label?.replace(/\s+/g, "").toLowerCase()}>{label}</label>
    {errormessage && <p>{errormessage}</p>}
  </StyledInput>
);

export default Input;

interface StyleProps {
  errormessage?: string;
  disabled?: boolean;
}

const StyledInput = styled.div<StyleProps>`
  position: relative;
  margin: 0 auto;
  margin-bottom: 25px;
  width: 100%;
  max-width: 400px;

  label {
    position: absolute;
    left: 0;
    padding: 15px;
    color: var(--secondary);
    pointer-events: none;
    transition: 0.4s;
  }

  input,
  textarea {
    padding: 15px;
    background: var(--white);
    color: var(--black);
    border: ${({ errormessage }) =>
      errormessage ? "1px solid var(--error)" : "1px solid var(--primary)"};
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    transition: 0.6s;
    &:focus,
    &:hover {
      border-color: var(--tint3);
      outline: none;
    }
    &:disabled {
      background: var(--silver);
      color: var(--grey);
      cursor: not-allowed;
      border-color: var(--warning);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  input:not(:placeholder-shown) + label,
  input:focus + label,
  textarea:not(:placeholder-shown) + label,
  textarea:focus + label {
    color: var(--grey);
    transform: translateY(-8px) translateX(10px);
    font-size: 12px;
    background: var(--white);
    padding: 2px;
    font-weight: 500;
    letter-spacing: 0.05rem;
  }

  p {
    position: absolute;
    font-weight: 500;
    letter-spacing: 0.05rem;
    font-size: 12px;
    left: 10px;
    bottom: -30px;
    color: var(--error);
  }
`;
