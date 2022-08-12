import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    authSetupStatus: false,
    authorized: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setAuth: (state) => {
      state.authorized = true;
    },
    removeAuth: (state) => {
      state.authorized = false;
    },
    setAuthSetup: (state) => {
      state.authSetupStatus = true;
    },
  },
  extraReducers: {},
});

export default authSlice.reducer;
export const { setAuth, removeAuth, setAuthSetup } = authSlice.actions;
