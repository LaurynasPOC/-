import { useDispatch } from "react-redux";
import { addAlert, removeAlert } from "../../state/slices/alertSlice";
import { AlertProps } from "../alerts/styled";

export const useAlert = () => {
  const dispatch = useDispatch();

  const notify = (type: AlertProps["type"], message: string) => {
    const notificationId = new Date().getTime().toString();
    dispatch(addAlert(notificationId, type, message));

    setTimeout(() => {
      dispatch(removeAlert({ id: notificationId }));
    }, 5000);
  };

  return notify;
};
