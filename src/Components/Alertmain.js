import React from "react";

const Alertmain = (props) => {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className="">
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissable fade-show`}
          role="alert"
        >
          <center>
            <strong>{capitalize(props.alert.msg)}</strong>
          </center>
        </div>
      )}
    </div>
  );
};
export default Alertmain;
