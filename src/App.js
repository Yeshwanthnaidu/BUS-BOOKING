import React, { useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import Login from "./Components/Login&Register/Login";
import Register from "./Components/Login&Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Login&Register/Header";
import BookingProfile from "./Components/bookingpage/BookingProfile";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Startup from "./Startup";
import Mybookings from "./Components/bookingpage/Mybookings";

function App() {
  const Loginstate = useSelector((state) => state.loginstatus.LoginStatus);

  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        {!Loginstate && (
          <>
            <Routes>
              <Route element={<Login />} path="/"></Route>
              <Route element={<Register />} path="/Register"></Route>
              <Route element={<Mybookings />} path="/Mybookings"></Route>
            </Routes>
          </>
        )}
        {Loginstate && <BookingProfile />}
      </Fragment>
      <ToastContainer
        position="top-center"
        autoClose={1800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
