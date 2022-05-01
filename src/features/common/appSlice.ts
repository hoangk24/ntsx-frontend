import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
 loading: boolean;
};

const appSlice = createSlice({
 name: "app",
 initialState: {} as State,
 reducers: {},
});

export const {} = appSlice.actions;
export default appSlice.reducer;
