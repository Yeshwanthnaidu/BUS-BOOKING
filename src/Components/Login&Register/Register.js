import React, { Fragment, useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [Yourname, SetYourName] = useState("");
  const [UsernameReg, SetUsernameReg] = useState("");
  const [UserpassReg, SetUserpassReg] = useState("");

  const YourNameHandler = (event) => {
    SetYourName(event.target.value);
  };

  const usernameHandler = (event) => {
    SetUsernameReg(event.target.value);
  };

  const userpasswordHandler = (event) => {
    SetUserpassReg(event.target.value);
  };

  let id = "id" + Math.random().toString(16).slice(2);

  let data = JSON.parse(localStorage.getItem(`users`));

  const RegisterHandler = () => {
    let existdatacheck = data?.filter((elem) => {
      return elem.username === UsernameReg;
    });
    if (existdatacheck?.length === 0) {
      let userdata = {
        id: id,
        Name:
          Yourname.charAt(0).toUpperCase() + Yourname.slice(1).toLowerCase(),
        username: UsernameReg,
        password: UserpassReg,
      };

      if (Yourname && UsernameReg && UserpassReg) {
        if (data == null) {
          localStorage.setItem(`users`, JSON.stringify([userdata]));
        } else {
          let users = JSON.parse(localStorage.getItem(`users`));
          localStorage.setItem(`users`, JSON.stringify([...users, userdata]));
        }
        SetYourName("");
        SetUsernameReg("");
        SetUserpassReg("");

        toast.success("Registration Sucess!!", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      }
    } else {
      toast.error("User Already Exist!!, Please Try Different Username", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Fragment>
      <div className="signup-main">
        <div className="container">
          <h1 className="user-name">
            <b>Your Name</b>
          </h1>
          <input
            className="user-name-signup"
            type="text"
            placeholder="Enter Username"
            value={Yourname}
            onChange={YourNameHandler}
            required
          />

          <h1 className="username">
            <b>Username</b>
          </h1>
          <input
            className="username-login"
            type="text"
            placeholder="Enter Name"
            onChange={usernameHandler}
            value={UsernameReg}
            required
          />

          <h1 className="password">
            <b>Password</b>
          </h1>

          <input
            className="password-login"
            type="password"
            placeholder="Enter Password"
            onChange={userpasswordHandler}
            value={UserpassReg}
            required
          />

          <button
            className="login-login"
            type="submit"
            onClick={RegisterHandler}
          >
            Register
          </button>
        </div>
      </div>
    </Fragment>
  );
}
export default Register;
