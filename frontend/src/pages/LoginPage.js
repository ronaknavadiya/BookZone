import React, { useEffect, useState } from "react";
import "../css/SignupLogin.css";
import loginpagebook from "../images/loginpagebook.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAppContext } from "../context/appContext";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { logout, setUserIDandToken, user } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logout();
    if (!data.email || !data.password) {
      toast("Please provide valid details...!");
    } else {
      loginUser(data.email, data.password);
    }
  };

  const loginUser = async (uEmail, uPassword) => {
    console.log(uEmail, uPassword);
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/user", {
        params: {
          email: uEmail,
          password: uPassword,
        },
      });
      const { user, token } = data;
      if (token && user) {
        setUserIDandToken(token, user, "login");
      } else {
        console.log("Error: Couldn't get userID or JWT Token");
      }
      toast("User has been Lgged in.. !");
    } catch (error) {
      console.log("Error: ", error);
      if (error.response.data.message) {
        toast(error.response.data.message);
        setData({ email: "", password: "" });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate("/");
      }
    }, 3000);
  }, [user, navigate]);

  return (
    <div className="loginpage">
      <div className="centerdiv">
        <ToastContainer theme="dark" />
        <div className="row">
          <div className="col-md-6 divleft">
            <p className="head">Log in</p>
            <p className="subhead">
              Don't have an account? <Link to="/signUp">Sign Up</Link>
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
                    onChange={handleChange}
                    value={data.email}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    name="password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn register mt-4"
                  onClick={handleSubmit}
                >
                  Log in
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
