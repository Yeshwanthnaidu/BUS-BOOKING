import { configureStore } from "@reduxjs/toolkit";
import loginstatusslice from "./LoginStatus-slice";

const store = configureStore({
  reducer: { loginstatus: loginstatusslice.reducer },
});

export default store;
