import React, { Fragment, useState } from "react";
import Mybookings from "./Mybookings";
import Selectseats from "./Selectseats";

export default function Buslistitems(props) {
  let [bookid, setbookid] = useState("");

  const busselectHandler = (id) => {
    setbookid(id);
  };

  const busdeselectHanddler = () => {
    setbookid(``);
  };

  return (
    <Fragment>
      <div>
        <div className="main-container-1">
          <div className="container-0">
            <div className="container-1">
              <div className="timings">
                <h3 className="start-time">{`${props.items.starttime}`}</h3>
                <h3 className="darr">|</h3>
                <h3 className="end-time">{`${props.items.droptime}`}</h3>
              </div>

              <div className="bus-details">
                <div className="bus-name">
                  <h2>{`${props.items.busname}`}</h2>
                </div>
                <div className="bus-type">
                  <h3>{`${props.items.bustype}`}</h3>
                </div>
              </div>

              <div className="seats-available">
                <h3>{`${props.items.seats}`} Seats available</h3>
                <h4 className="travel-distance">
                  Travel Distance :{`${props.items.distance}`}
                </h4>
              </div>

              <div className="select-box">
                <div className="ticket-price">
                  <h2 className="price-ti">Rs. {`${props.items.price}`}/-</h2>
                  <button
                    className="btn-book button-24"
                    onClick={(e) => busselectHandler(props?.items?.busid)}
                  >
                    Select Tickets
                  </button>
                </div>
              </div>
            </div>
            {props.items.busid === bookid && (
              <Selectseats
                items={busdeselectHanddler}
                items2={props?.items?.busid}
                items3={props.items2}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
