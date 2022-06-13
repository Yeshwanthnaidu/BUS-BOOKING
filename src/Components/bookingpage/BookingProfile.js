import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import "./BookingProfile.css";
import Buslist from "./Buslist";
import { loginstatusactions } from "../../Store/LoginStatus-slice";
import Mybookings from "./Mybookings";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingProfile(props) {
  const today = new Date();
  const year = `${today.getFullYear()}`;
  const month = `${today.getMonth() + 1}`;
  const month01 = month.padStart(`2`, 0);
  const date = `${today.getDate()}`;
  const date01 = date.padStart(`2`, 0);

  const currentdate = `${year}-${month01}-${date01}`;

  const [fromcity, setfromcity] = useState(``);
  const [tocity, settocity] = useState(``);
  const [doj, setdoj] = useState(currentdate);

  const dispatch = useDispatch();

  const searchHandler = () => {
    if (
      fromcity == "" ||
      tocity == "" ||
      fromcity == "xxx" ||
      tocity == "yyy"
    ) {
      toast.error("Please Select From and To Cities");
    }

    if (fromcity && tocity) {
      let searchdetails = {
        from: fromcity,
        to: tocity,
      };

      dispatch(loginstatusactions.storesearch(searchdetails));
    }
  };

  const openmybookings = useSelector(
    (state) => state.loginstatus.openmybooking
  );

  return (
    <Fragment>
      <div className="maincont">
        <div className="search-box">
          <div className="from-input">
            <h1>From</h1>
            <select
              className="selection"
              onChange={(e) => {
                setfromcity(e.target.value);
              }}
            >
              <option className="optionval" value={`xxx`}>
                --Select City--
              </option>
              <option className="optionval" value="Hyderabad">
                Hyderabad
              </option>
              <option className="optionval" value="Vijayawada">
                Vijayawada
              </option>
              <option className="optionval" value="chennai">
                Chennai
              </option>
              <option className="optionval" value="banglore">
                Banglore
              </option>
            </select>
          </div>

          <div className="to-input">
            <h1>To</h1>
            <select
              className="selection"
              onChange={(e) => {
                settocity(e.target.value);
              }}
            >
              <option className="optionval" value={`yyy`}>
                --Select City--
              </option>
              <option className="optionval" value="Hyderabad">
                Hyderabad
              </option>
              <option className="optionval" value="Vijayawada">
                Vijayawada
              </option>
              <option className="optionval" value="chennai">
                Chennai
              </option>
              <option className="optionval" value="banglore">
                Banglore
              </option>
            </select>
          </div>

          <div className="to-input">
            <h1>On</h1>
            <input
              className="selection-date"
              type="date"
              min={currentdate}
              defaultValue={currentdate}
              onChange={(e) => {
                setdoj(e.target.value);
              }}
            />
          </div>

          <div>
            <button className="searchbus-btn button-87" onClick={searchHandler}>
              Search
            </button>
          </div>
        </div>
      </div>
      <Buslist items={props} items3={doj} />
      {openmybookings && <Mybookings />}
    </Fragment>
  );
}

export default BookingProfile;
