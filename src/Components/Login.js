import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AlertContext from "../Context/AlertContext";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Save the auth token and Redirect
      localStorage.setItem("token", json.authToken);
      history("/");
      showAlert("Logged in Successfully.", "success");
    } else {
      showAlert("Please Log in with valid credentials.", "danger");
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="container ">
      <form
        onSubmit={handleSubmit}
        className="form"
        //style={{ color: "red", backgroundColor: "black" }}
      >
        <div className="mb-3 my-3 ">
          <label htmlFor="email" className="form-label label">
            <b>Email address : </b>
          </label>
          <input
            //  style={{ color: "red", backgroundColor: "black" }}
            onChange={onChange}
            type="email"
            name="email"
            id="email"
            className="form-control input"
            aria-describedby="emailHelp"
            value={credentials.email}
            placeholder="Enter your Email address here  "
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label label">
            <b>Password : </b>
          </label>
          <input
            onChange={onChange}
            type="password"
            className="form-control input"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Enter your Password here "
          />
        </div>
        <button
          type="submit"
          style={{ width: "25%" }}
          className="btn btn-primary  my-3"
        >
          Submit
        </button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
export default Login;
