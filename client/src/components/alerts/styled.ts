import styled from "styled-components";

interface Props {
  type: "info" | "success" | "warning" | "error";
}

export const AlertsContainerStyles = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 100px;
  right: 0;
  gap: 15px;
`;

export const AlertStyles = styled.div<Props>`
  position: relative;
  width: fit-content;
  padding: 10px;
  box-shadow: ${({ type }) => `-5px 2px 20px -7px ${getColorForType(type)}`};
  letter-spacing: 0.8px;
  font-weight: 500;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ type }) => getColorForType(type)};
    animation: timeline 5s linear forwards;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ type }) => getColorForType(type)};
    animation: timeline 5s linear forwards;
  }
  @keyframes timeline {
    100% {
      width: 0;
    }
  }
`;

const getColorForType = (type?: Props["type"]) => {
  switch (type) {
    case "success":
      return "var(--success)";
    case "error":
      return "var(--error)";
    case "warning":
      return "var(--warning)";
    case "info":
    default:
      return "var(--info)";
  }
};
