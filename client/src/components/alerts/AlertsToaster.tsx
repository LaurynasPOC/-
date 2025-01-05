import { AlertStyles, AlertsContainerStyles } from "./styled";
import React from "react";
import { useSelector } from "react-redux";
import { selectNotificationMessages } from "../../state/slices/alertSlice";

export interface AlertMessage {
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const Alert: React.FC<AlertMessage> = ({ message, type }) => {
  return <AlertStyles type={type}>{message}</AlertStyles>;
};

const AlertContainer: React.FC = () => {
  const messages = useSelector(selectNotificationMessages);
  return (
    <AlertsContainerStyles>
      {messages.map((msg) => (
        <Alert key={msg.id} message={msg.text} type={msg.type} />
      ))}
    </AlertsContainerStyles>
  );
};

export default AlertContainer;
