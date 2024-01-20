import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AlertContext from "../Context/AlertContext";

const SignUp = () => {
  const host = "localhost:5000";
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password } = credentials;
    const response = await fetch(`http://${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and Redirect
      showAlert("User Registered Successfully.", "success");
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      showAlert("Something went wrong", "danger");
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="container signup">
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label label">
            Name :
          </label>
          <input
            onChange={onChange}
            placeholder="Enter your name here"
            type="text"
            name="name"
            id="name"
            className="form-control input"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label label">
            Email address :
          </label>
          <input
            onChange={onChange}
            placeholder="Enter your email here"
            type="email"
            name="email"
            id="email"
            className="form-control input"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label label">
            Password
          </label>
          <input
            onChange={onChange}
            required
            minLength={5}
            placeholder="Enter your password here"
            type="password"
            className="form-control input"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label label">
            Confirm Password
          </label>
          <input
            onChange={onChange}
            required
            minLength={5}
            placeholder="Confirm the entered password"
            type="password"
            className="form-control input"
            id="cpassword"
            name="cpassword"
          />
        </div>
        <button type="submit" className=" btn btn-primary ">
          Submit
        </button>
      </form>
    </div>
  );
};
export default SignUp;
