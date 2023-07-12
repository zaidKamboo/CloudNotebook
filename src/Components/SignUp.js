import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AlertContext from "../Context/AlertContext";

const SignUp = () => {
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and Redirect
      localStorage.setItem("token", json.authToken);
      console.log(localStorage.getItem("token"));
      history("/");
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Name :
          </label>
          <input
            onChange={onChange}
            placeholder="Enter your name here"
            type="text"
            name="name"
            id="name"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address :
          </label>
          <input
            onChange={onChange}
            placeholder="Enter your email here"
            type="email"
            name="email"
            id="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            required
            minLength={5}
            placeholder="Enter your password here"
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={onChange}
            required
            minLength={5}
            placeholder="Confirm the entered password"
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default SignUp;
