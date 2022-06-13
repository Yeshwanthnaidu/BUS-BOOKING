import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./Buslist.css";
import Buslistitems from "./Buslistitems";
import Mybookings from "./Mybookings";

export default function Buslist(props) {
  const busdatalist = JSON.parse(localStorage.getItem(`buslist`));
  const searchdata = useSelector((state) => state.loginstatus.datacities);

  const [sameorigin, setsameorigin] = useState(false);

  useMemo(() => {
    setsameorigin(false);
    if (
      searchdata.from == searchdata.to &&
      searchdata.from !== undefined &&
      searchdata.to !== undefined
    ) {
      setsameorigin(true);
    }
  }, [searchdata]);

  const cur_buslist = busdatalist.filter((elem) => {
    return elem.from === searchdata.from && elem.to === searchdata.to;
  });

  return (
    <>
      {sameorigin && (
        <div className="error-box">
          <h1 className="error-msg">
            Origin and Destination city cannot be the same
          </h1>
        </div>
      )}
      {!sameorigin &&
        cur_buslist.map((elem) => (
          <Buslistitems key={elem.busid} items={elem} items2={props.items3} />
        ))}
    </>
  );
}
