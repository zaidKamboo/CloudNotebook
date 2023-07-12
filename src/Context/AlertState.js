import AlertContext from "./AlertContext";
import { useState } from "react";
const AlertState = (props) => {
  const [alert, setAlert] = useState({ msg: "Alert", type: "primary" });
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
  };
  setTimeout(() => {
    setAlert(null);
  }, 1500);
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
