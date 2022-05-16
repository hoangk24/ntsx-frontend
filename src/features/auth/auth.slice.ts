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
  setUser(state: State, action: PayloadAction<IUser>) {
   state.user = action.payload;
  },
  setAuth(state: State, action: PayloadAction<any>) {
   state.user = action.payload.user;
   state.isLogin = true;
   localStorage.setItem("token", action.payload.token.token);
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

export const { setAuth, setLogOut, setUser } = authSlice.actions;
export default authSlice.reducer;
