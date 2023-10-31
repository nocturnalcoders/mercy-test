import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../api/fetchUserApi";
import { RootState } from "../store";

const initialState = {
  user: null,
  active: null,
  isAuth: false,
  userNftList: []
} as {
  user: null | User;
  isAuth: boolean;
  active: string | null;
  userNftList: any[];
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    wallet: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    user: (state, action: PayloadAction<any[]>) => {
      state.userNftList = action.payload;
    },
  },
});

export const { auth } = slice.actions;
export default slice.reducer;

export const selectisAuth = (state: RootState) =>
  state.user.isAuth;
