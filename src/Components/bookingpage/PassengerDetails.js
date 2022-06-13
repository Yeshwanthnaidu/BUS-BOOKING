import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "./PassengerDetails.css";

export default function PassengerDetails(props) {
  const allbookingdata = props.items2;
  let totalpassengers = Array.from(Array(allbookingdata.totaltickets - 1));

  const prevbookingdata = JSON.parse(localStorage.getItem(`bookdata`));
  const [passengerdata_main_name, setpassengerdata_main_name] = useState("");
  const [passengerdata_main_email, setpassengerdata_main_email] = useState("");
  const [passengerdata_main_phoneno, setpassengerdata_main_phoneno] =
    useState("");
  const [passengerdata_main_age, setpassengerdata_main_age] = useState("");
  const [passengerdata_main_gender, setpassengerdata_main_gender] =
    useState("");

  const [enalbebtn, setenablebtn] = useState(false);

  const passengerdata_main_data = {
    name: passengerdata_main_name,
    age: passengerdata_main_age,
    phoneno: passengerdata_main_phoneno,
    email: passengerdata_main_email,
    gender: passengerdata_main_gender,
  };

  const dataarr = [];

  totalpassengers.map(() => {
    dataarr.push({ name: "", age: "", gender: "" });
  });

  const [co_passengerdata, setco_passengerdata] = useState(dataarr);

  const handlechangeinput = (index, event) => {
    const values = [...co_passengerdata];
    values[index][event.target.name] = event.target.value;
    setco_passengerdata(values);
  };

  const finalbookHandler = () => {
    if (
      passengerdata_main_name == "" &&
      passengerdata_main_age == "" &&
      passengerdata_main_phoneno == "" &&
      passengerdata_main_gender == "" &&
      passengerdata_main_gender == `default` &&
      !passengerdata_main_email.includes("@")
    ) {
      toast.error(`please Fill All Feilds`);
    } else {
      const traveldate = props.items3;
      const alldata = {
        bookid: "id" + Math.random().toString(16).slice(2),
        userid: allbookingdata.userdata.id,
        busdetails: allbookingdata.currentbus,
        traveldate: traveldate,
        ticketprice: allbookingdata.totalprice,
        mainpassengerdata: passengerdata_main_data,
        co_passengerdata: [...co_passengerdata],
      };
      if (prevbookingdata !== null) {
        localStorage.setItem(
          `bookdata`,
          JSON.stringify([...prevbookingdata, alldata])
        );

        let buses = JSON.parse(localStorage.getItem("buslist"));
        const updateddata = buses.map((elem) => {
          if (elem.busid === allbookingdata.currentbus.busid) {
            return {
              ...elem,
              seats: elem.seats - allbookingdata.totaltickets,
            };
          }
          return elem;
        });

        localStorage.setItem("buslist", JSON.stringify(updateddata));
      } else {
        localStorage.setItem(`bookdata`, JSON.stringify([alldata]));

        let buses = JSON.parse(localStorage.getItem("buslist"));
        const updateddata = buses.map((elem) => {
          if (elem.busid === allbookingdata.currentbus.busid) {
            return {
              ...elem,
              seats: elem.seats - allbookingdata.totaltickets,
            };
          }
          return elem;
        });

        console.log(updateddata);

        localStorage.setItem("buslist", JSON.stringify(updateddata));
      }
      props.items();
      toast.success("Booking Successful");
    }
  };

  useEffect(() => {
    setenablebtn(false);
    if (
      passengerdata_main_name != "" &&
      passengerdata_main_age != "" &&
      passengerdata_main_phoneno != "" &&
      passengerdata_main_gender != "" &&
      passengerdata_main_gender != `default` &&
      passengerdata_main_email.includes("@")
    ) {
      if (co_passengerdata?.length !== 0) {
        co_passengerdata?.map((elem, i) => {
          if (elem.name && elem.age && elem.gender) {
            setenablebtn(true);
          } else {
            setenablebtn(false);
          }
        });
      } else {
        setenablebtn(true);
      }
    }
  }, [
    passengerdata_main_name,
    passengerdata_main_age,
    passengerdata_main_phoneno,
    passengerdata_main_gender,
    passengerdata_main_email,
    co_passengerdata,
  ]);

  return (
    <div>
      <div className="main-container-overlay">
        <div className="passenger-details-main">
          <div className="passenger-container">
            <div className="info-1">
              Journey Details:- {allbookingdata.currentbus.from} to{" "}
              {allbookingdata.currentbus.to} on {props.items3}. And Total Price
              is Rs. {allbookingdata.totalprice}/-
            </div>
            <div
              className="greet
            "
            >
              Happy Journey {allbookingdata.userdata.Name}!!!
            </div>
            <h3 className="head-pd">Enter Passenger Details :</h3>
            <div className="passenger-ind">
              <div className="list-no">
                <h3>Passenger No.1</h3>
              </div>

              <div className="Name-inp-box">
                <input
                  className="Name-inp"
                  type="text"
                  placeholder="Passenger Name"
                  onChange={(e) => setpassengerdata_main_name(e.target.value)}
                  onBlur={() => {
                    if (passengerdata_main_name == ``) {
                      toast.error(`Name Shouldn't be Empty!!`);
                    }
                  }}
                />
              </div>

              <div className="age-inp-box">
                <input
                  className="age-inp"
                  min={0}
                  max={100}
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setpassengerdata_main_age(e.target.value)}
                  onBlur={() => {
                    if (passengerdata_main_age == ``) {
                      toast.error(`Age Shouldn't be Empty!!`);
                    }
                  }}
                />
              </div>

              <div className="select-inp-box">
                <select
                  className="select-gender"
                  onChange={(e) => setpassengerdata_main_gender(e.target.value)}
                  onBlur={() => {
                    if (
                      passengerdata_main_gender == `` ||
                      passengerdata_main_gender == `default`
                    ) {
                      toast.error(`Please select Gender`);
                    }
                  }}
                >
                  <option value={"default"}>--Select Gender--</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>

              <div className="Email-box">
                <input
                  className="Name-inp"
                  type="Number"
                  placeholder="Phone No."
                  onChange={(e) =>
                    setpassengerdata_main_phoneno(e.target.value)
                  }
                  onBlur={() => {
                    if (passengerdata_main_phoneno == ``) {
                      toast.error(`Please Enter a Valid Phone Number`);
                    }
                  }}
                />
              </div>

              <div className="Email-box">
                <input
                  className="Name-inp"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setpassengerdata_main_email(e.target.value)}
                  onBlur={() => {
                    if (!passengerdata_main_email.includes("@")) {
                      toast.error(`Please Enter a Valid Email ID`);
                    }
                  }}
                />
              </div>
            </div>

            {co_passengerdata?.map((e, i) => {
              return (
                <div className="passenger-ind-1" key={i}>
                  <div className="list-no">
                    <h3>Passenger No.{i + 2}</h3>
                  </div>

                  <div className="Name-inp-box">
                    <input
                      className="Name-inp"
                      type="text"
                      name="name"
                      placeholder="Passenger Name"
                      value={e.name}
                      onChange={(event) => handlechangeinput(i, event)}
                    />
                  </div>

                  <div className="age-inp-box">
                    <input
                      className="age-inp"
                      min={0}
                      max={100}
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={e.age}
                      onChange={(event) => handlechangeinput(i, event)}
                    />
                  </div>

                  <div className="select-inp-box">
                    <select
                      className="select-gender"
                      name="gender"
                      value={e.gender}
                      onChange={(event) => handlechangeinput(i, event)}
                    >
                      <option>--Select Gender--</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>
                  </div>
                </div>
              );
            })}

            <div className="final-book-btns">
              <button
                className="book-btn-001 button-786"
                onClick={finalbookHandler}
                disabled={!enalbebtn}
              >
                Book Now
              </button>
              <button className="book-btn-001 button-786" onClick={props.items}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
