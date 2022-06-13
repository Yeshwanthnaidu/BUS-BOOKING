import { createSlice } from "@reduxjs/toolkit";

const loginis = () => {
  let Loginstats = localStorage.getItem(`Login`);
  if (Loginstats == `true`) {
    return true;
  } else if (Loginstats == `false`) {
    return false;
  }
};

const presentuser = () => {
  return JSON.parse(localStorage.getItem(`presentuser`));
};

const loginstatusslice = createSlice({
  name: `LoginStatus`,
  initialState: {
    LoginStatus: loginis(),
    userdata: presentuser(),
    datacities: {},
    openmybooking: false,
  },
  reducers: {
    login(state) {
      localStorage.setItem(`Login`, true);
      state.LoginStatus = loginis();
    },
    logout(state) {
      localStorage.setItem(`Login`, false);
      state.LoginStatus = loginis();
      window.location.reload(false);
    },
    storedata(state, actions) {
      state.userdata = actions.payload;
      localStorage.setItem(`presentuser`, JSON.stringify(actions.payload));
    },
    storesearch(state, actions) {
      state.datacities = actions.payload;
    },
    openmybookings(state) {
      state.openmybooking = true;
    },
    closemybookings(state) {
      state.openmybooking = false;
    },
  },
});

export const loginstatusactions = loginstatusslice.actions;

export default loginstatusslice;
