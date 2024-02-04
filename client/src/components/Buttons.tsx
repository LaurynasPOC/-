import styled from "styled-components";

interface ButtonStylesProps {
  margin?: number | string;
}

const BaseButton = styled.button<ButtonStylesProps>`
  padding: 10px 8px;
  color: var(--white);
  border-radius: 4px;
  border: none;
  appearance: none;
  box-shadow: none;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.25s ease-out;
  background: var(--primary);
  margin: ${({ margin }) => margin || 0};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    color: var(--gblue);
    background: var(--silver);
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: var(--primary);
  color: var(--white);
  &:hover {
    opacity: 0.7;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background: var(--white);
  color: var(--primary);
  border: 1px solid var(--primary);
  &:hover {
    background: var(--silver);
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "base" | "primary" | "secondary";
  children: React.ReactNode;
  margin?: number | string;
  type?: "submit";
}

const Button: React.FC<ButtonProps> = ({
  variant = "base",
  children,
  type,
  ...rest
}) => {
  if (variant === "primary")
    return (
      <PrimaryButton type={type} {...rest}>
        {children}
      </PrimaryButton>
    );
  if (variant === "secondary")
    return <SecondaryButton {...rest}>{children}</SecondaryButton>;

  return <BaseButton {...rest}>{children}</BaseButton>;
};

export default Button;
