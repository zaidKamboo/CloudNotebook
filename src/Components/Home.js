import React, { useEffect } from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container my-3">
      <Notes />
    </div>
  );
};
