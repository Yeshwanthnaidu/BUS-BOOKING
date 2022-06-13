import React, { useMemo } from "react";
import { Fragment } from "react";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginstatusactions } from "../../Store/LoginStatus-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();

  const [Loginid, setLoginId] = useState(``);
  const [loginpassword, setLoginPassword] = useState(``);

  const LoginIdHandler = (event) => {
    event.preventDefault();
    setLoginId(event.target.value);
  };

  const LoginpasswordHandler = (event) => {
    event.preventDefault();
    setLoginPassword(event.target.value);
  };

  const LoginHanlder = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(localStorage.getItem(`users`));

      let cur_user = data?.find((user) => {
        return Loginid === user.username;
      });

      if (cur_user == null) {
        throw `User Not Found!!`;
      } else {
        if (loginpassword === cur_user.password) {
          toast.success("Login Sucess", { position: "top-center" });
          dispatch(loginstatusactions.login());
          dispatch(loginstatusactions.storedata(cur_user));
        } else {
          toast.error("Wrong Password", { position: "top-center" });
        }
      }
    } catch (error) {
      toast.error(error, { position: "top-center" });
    }
  };

  return (
    <Fragment>
      <div className="login-main">
        <div className="container">
          <h1 className="username">
            <b>Username</b>
          </h1>
          <input
            className="username-login"
            type="text"
            placeholder="Enter Username"
            onChange={LoginIdHandler}
            required
          />

          <h1 className="password">
            <b>Password</b>
          </h1>

          <input
            className="password-login"
            type="password"
            placeholder="Enter Password"
            onChange={LoginpasswordHandler}
            required
          />

          <button className="login-login" type="submit" onClick={LoginHanlder}>
            Login
          </button>

          <Link className="new-acc" to={"/Register"}>
            <b>Create New account</b>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
