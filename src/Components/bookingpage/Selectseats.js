import React, { Fragment, useState } from "react";
import PassengerDetails from "./PassengerDetails";
import "./Selectseats.css";
import { useSelector } from "react-redux";

export default function Selectseats(props) {
  const busdata = JSON.parse(localStorage.getItem(`buslist`));

  const cur_busdata = busdata.find((elem) => {
    return elem.busid === props.items2;
  });

  let [ticketsval, setticketsval] = useState(1);
  const [openmodal, setopenmodal] = useState(false);

  const increment = () => {
    if (ticketsval < 4) {
      setticketsval(ticketsval + 1);
    }
  };

  const decrement = () => {
    if (ticketsval > 1) {
      setticketsval(ticketsval - 1);
    }
  };

  const bookseatsHandler = () => {
    setopenmodal(true);
  };

  const closemodal = () => {
    setopenmodal(false);
  };

  let passengerdetailsdata = {
    totaltickets: ticketsval,
    totalprice: ticketsval * cur_busdata.price,
    currentbus: cur_busdata,
    userdata: useSelector((state) => state.loginstatus.userdata),
  };

  return (
    <Fragment>
      <div className="select-main">
        <div className="select-avail">
          <h3>Total Available Seats: {cur_busdata.seats - ticketsval}</h3>
        </div>

        <div className="select-selection">
          <button className="decrement" onClick={decrement}>
            {" "}
            -{" "}
          </button>
          <input
            className="input-box"
            type="text"
            value={ticketsval}
            onChange={(e) => {
              setticketsval(e.target.value);
            }}
          />
          <button className="increment" onClick={increment}>
            {" "}
            +{" "}
          </button>
        </div>

        <div className="select-total">
          <h3> Total Price = Rs. {ticketsval * cur_busdata.price}/-</h3>
        </div>

        <div className="book-btn">
          <button className="book-btn-btn button-25" onClick={bookseatsHandler}>
            Book Seats
          </button>
          <button className="book-btn-cancel" onClick={props.items}>
            Cancel
          </button>
        </div>
      </div>
      {openmodal && (
        <PassengerDetails
          items={closemodal}
          items2={passengerdetailsdata}
          items3={props.items3}
          items4={ticketsval}
        />
      )}
    </Fragment>
  );
}
