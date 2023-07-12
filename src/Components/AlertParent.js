import { React } from "react";
import Alertmain from "./Alertmain";
import AlertContext from "../Context/AlertContext";
import { useContext } from "react";
const AlertParent = () => {
  const al = useContext(AlertContext);
  const { alert } = al;
  return (
    <div style={{ height: "50px" }}>
      <Alertmain alert={alert} />
    </div>
  );
};
export default AlertParent;
