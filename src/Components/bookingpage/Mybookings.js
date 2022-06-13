import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Mybookings.css";
import { loginstatusactions } from "../../Store/LoginStatus-slice";
import { toast } from "react-toastify";

export default function Mybookings() {
  const [datadeleted, setdatadeleted] = useState(``);
  let cur_user = useSelector((state) => state.loginstatus.userdata);
  let busbookingdata = JSON.parse(localStorage.getItem(`bookdata`));
  const dispatch = useDispatch();
  const mybookingclosehandler = () => {
    dispatch(loginstatusactions.closemybookings());
  };

  const bookingdetails = busbookingdata?.filter((elem) => {
    return elem.userid === cur_user.id;
  });

  const cancelbookinghandler = (event) => {
    setdatadeleted(false);

    let bookid = event.bookid;

    let busbookingdata = JSON.parse(localStorage.getItem(`bookdata`));

    let removeddata = busbookingdata?.filter((elem) => {
      return elem.bookid !== bookid;
    });

    localStorage.setItem(`bookdata`, JSON.stringify(removeddata));

    let buses = JSON.parse(localStorage.getItem("buslist"));
    const updateddata = buses.map((elem) => {
      if (elem.busid === event.busdetails.busid) {
        return {
          ...elem,
          seats: elem.seats + (event.co_passengerdata.length + 1),
        };
      }
      return elem;
    });

    localStorage.setItem("buslist", JSON.stringify(updateddata));

    setdatadeleted(Math.random());
    toast.info("Booking Cancelled.");
  };

  return (
    <div className="mainest">
      <div className="main-container-mybooking">
        <div className="sub-container-mybooking">
          <div className="main-heading-001">
            <h1 className="main-heading-mybooking">My Bookings</h1>
            <button
              className="cancel-ticket-btn-01"
              onClick={mybookingclosehandler}
            >
              X
            </button>
          </div>

          {bookingdetails.length == 0 && (
            <h1 className="error-msg">No Bookings Found!!</h1>
          )}
          {bookingdetails?.map((elem, index) => {
            return (
              <div className="single-journey" key={index}>
                <div className="total-header">
                  <div className="details-header">
                    <div className="mybooking-header-1">
                      <h3>From: {elem.busdetails.from}</h3>
                      <h3>To: {elem.busdetails.to}</h3>
                      <h3>On: {elem.traveldate}</h3>
                      <h3>Ticket Price: {elem.ticketprice}/-</h3>
                    </div>
                    <div className="mybooking-header-2">
                      <h4>Bus Details: {elem.busdetails.busname}</h4>
                      <h4>Phone No: {elem.mainpassengerdata.phoneno}</h4>
                      <h4>Email: {elem.mainpassengerdata.email}</h4>
                      <button
                        className="cancel-ticket-btn"
                        onClick={() => {
                          cancelbookinghandler(elem); // elem?.bookid
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="main-heading-2">
                      <h3>Passenger Details:</h3>
                    </div>
                    <div className="p-details-header">
                      <h5>Name</h5>
                      <h5>Gender</h5>
                      <h5>Age</h5>
                    </div>
                  </div>
                </div>
                <div className="p-details">
                  <h5>* {elem.mainpassengerdata.name}</h5>
                  <h5>{elem.mainpassengerdata.gender}</h5>
                  <h5>{elem.mainpassengerdata.age}</h5>
                </div>
                {elem?.co_passengerdata?.map((elem, index) => {
                  return (
                    <div className="p-details" key={index}>
                      <h5>* {elem.name}</h5>
                      <h5>{elem.gender}</h5>
                      <h5>{elem.age}</h5>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
