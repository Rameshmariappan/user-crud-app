import { createSlice } from "@reduxjs/toolkit";
import { userDetailsType } from "../@types/userTypes";

const initialState: userDetailsType = {
  isUserLogin: false,
  isSideBarOpen: true,
  userLoginData:{
    useremail:"ram@gmail.com",
    password:"Password@123"
  }
};

export const uiSlices = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSideBarState(state, action) {
      state.isSideBarOpen = action.payload;
    },
    setLoggedin(state, action) {
      state.isUserLogin = action.payload;
    },
  },
});

export const { setSideBarState,setLoggedin } = uiSlices.actions;

export default uiSlices.reducer;
