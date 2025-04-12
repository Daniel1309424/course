import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

export const initialNotificationState = {
  message: "",
  type: "",
};

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, message: action.message, type: action.messageType };
    case "CLEAR_NOTIFICATION":
      return { ...state, message: "", type: "" };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificationState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
