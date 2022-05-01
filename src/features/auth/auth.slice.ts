import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "constants/models/auth.model";

type State = {
 isLogin: boolean;
 user: IUser | null;
};

const authSlice = createSlice({
 name: "auth",
 initialState: {
  isLogin: false,
 } as State,
 reducers: {
  setAuth(state: State, action: PayloadAction<any>) {
   console.log(action.payload);

   state.user = action.payload.user;
   state.isLogin = true;
   localStorage.setItem("token", action.payload.token.token);
   localStorage.setItem(
    "expired",
    action.payload.refreshToken.expiresIn
   );
   localStorage.setItem(
    "refreshToken",
    action.payload.refreshToken.token
   );
  },
  setLogOut(state: State) {
   state.isLogin = false;
   state.user = null;
   localStorage.removeItem("token");
   localStorage.removeItem("refreshToken");
  },
 },
});

export const { setAuth, setLogOut } = authSlice.actions;
export default authSlice.reducer;
