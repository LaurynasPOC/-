import React from "react";
import styled from "styled-components";

interface Props {
  message?: string;
  type?: "info" | "success" | "warning" | "error";
}

const Notification: React.FC<Props> = ({ message, type }) => {
  return <NotificationStyles type={type}>{message}</NotificationStyles>;
};

export default Notification;

const NotificationStyles = styled.div<Props>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100px;
  right: 0;
  width: fit-content;
  padding: 10px;
  box-shadow: -5px 2px 20px -7px var(--primary);
  letter-spacing: 0.8px;
  font-weight: 500;
  display: ${({ message }) => message && "none"};
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--success);
    animation: timeline 5s linear forwards;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--success);
    animation: timeline 5s linear forwards;
  }
  @keyframes timeline {
    100% {
      width: 0;
    }
  }
`;
