import React from "react";
import "../css/SignupLogin.css";
import loginpagebook from "../images/loginpagebook.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="loginpage">
      <div className="centerdiv">
        <div className="row">
          <div className="col-md-6 divleft">
            <p className="head">Log in</p>
            <p className="subhead">
              Don't have an account? <Link to="/signUp">Sign in</Link>
            </p>
            <hr />
            <div className="row d-flex align-items-center justify-content-center">
                <form>
                
                  <div className="form-group">
                    <label className="label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <button type="submit" className="btn register mt-4">
                    Sign in
                  </button>
                </form>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block ">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={loginpagebook}
                className="img-fluid"
                style={{
                  minHeight: 550,
                }}
                alt="book"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
