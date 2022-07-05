import React, { useEffect, useRef } from "react";
import "../css/SignupLogin.css";
import loginpagebook from "../images/loginpagebook.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAppContext } from "../context/appContext";

const SignupPage = () => {
  const { setUserIDandToken, user } = useAppContext();
  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      signUp(
        email.current.value,
        password.current.value,
        username.current.value
      );
    } catch (error) {
      toast(error);
    }

    navigate("/favGenre");

    // console.log(email.current.value, username, password);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const signUp = async (uemail, pass, uname) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user", {
        email: uemail,
        userName: uname,
        password: pass,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        if (token && user) {
          setUserIDandToken(token, user, "signup");
        } else {
          console.log("Error: Couldn't get userID or JWT Token");
        }
        toast("User has been created.. !");
      }
    } catch (error) {
      console.log("Error: ", error.response.data.message);
      if (error.response.data.message) {
        toast(error.response.data.message);
      }
    }
  };

  return (
    <div className="loginpage">
      <div className="centerdiv">
        <ToastContainer theme="dark" />
        <div className="row">
          <div className="col-md-6 divleft">
            <p className="head">Get's started.</p>
            <p className="subhead">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <hr />
            <div className="row align-items-center justify-content-center">
              <form>
                <div className="form-group">
                  <label className="label">User name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User name"
                    ref={username}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    ref={email}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    ref={password}
                  />
                </div>

                <button
                  type="submit"
                  className="btn register mt-4"
                  onClick={handleSubmit}
                >
                  Register
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

export default SignupPage;
