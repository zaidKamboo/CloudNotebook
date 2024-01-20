import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/">
                  <span className="icon">CloudNoteBook</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to={token ? "/" : "/login"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link
                className="btn btn-primary mx-2"
                to="/login"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                role="button"
              >
                Logout
              </Link>
              <Link
                className="btn btn-primary mx-2"
                to="/signup  "
                role="button"
              >
                SignUp
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
/*
.new {
  margin-top: 10%;
  margin-left: 23%;
  width: 56%;
  text-align: center;
  background-color: aqua;
  border: 2px solid white;
  border-radius: 10px;
  border-collapse: collapse;
}
 */
