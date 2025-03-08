import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface SelectProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  errormessage?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  required,
  errormessage,
  disabled,
}) => (
  <StyledSelectWrapper errormessage={errormessage}>
    <select
      id={label.replace(/\s+/g, "").toLowerCase()}
      name={label}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label htmlFor={label.replace(/\s+/g, "").toLowerCase()}>{label}</label>
    {errormessage && <p>{errormessage}</p>}
  </StyledSelectWrapper>
);

export default Select;

interface StyleProps {
  errormessage?: string;
  disabled?: boolean;
}

const StyledSelectWrapper = styled.div<StyleProps>`
  position: relative;
  margin: 0 auto;
  margin-bottom: 25px;
  width: 100%;
  max-width: 400px;

  label {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary);
    pointer-events: none;
    transition: 0.4s;
    background: var(--white);
    padding: 0 5px;
  }

  select {
    padding: 15px;
    background: var(--white);
    color: var(--black);
    border: ${({ errormessage }) =>
      errormessage ? "1px solid var(--error)" : "1px solid var(--primary)"};
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    transition: 0.6s;
    appearance: none;
    cursor: pointer;

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

  select:not(:placeholder-shown) + label,
  select:focus + label {
    color: var(--grey);
    transform: translateY(-28px) translateX(10px);
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
