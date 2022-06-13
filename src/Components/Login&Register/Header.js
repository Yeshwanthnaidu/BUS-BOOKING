import React, { Fragment, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo-maker.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginstatusactions } from "../../Store/LoginStatus-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const Loginstate = useSelector((state) => state.loginstatus.LoginStatus);
  const username = useSelector((state) => state.loginstatus?.userdata?.Name);
  const dispatch = useDispatch();

  // const username = "yeshwanth";

  const logoutHandler = () => {
    toast.info(`Logged Out Successfully`);
    setTimeout(() => {
      dispatch(loginstatusactions.logout());
      localStorage.setItem(`presentuser`, JSON.stringify({}));
    }, 1000);
  };

  const openbookinghandler = () => {
    dispatch(loginstatusactions.openmybookings());
  };

  return (
    <Fragment>
      <div className="logo-main">
        <div className="logo-c">
          <img className="logo-img" src={Logo} alt="Logo" />
        </div>
        <div className="btns-container">
          {Loginstate && <h1 className="welcome-text">Welcome {username}!</h1>}
          <div className="btns-box">
            {!Loginstate && (
              <>
                <Link className="login-btn" to={"/"}>
                  Login
                </Link>
                <Link className="reg-btn" to={"/Register"}>
                  Register
                </Link>
              </>
            )}
            {Loginstate && (
              <>
                <button className="login-btn" onClick={openbookinghandler}>
                  My Bookings
                </button>
                <button onClick={logoutHandler} className="reg-btn">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
