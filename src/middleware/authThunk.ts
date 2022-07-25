import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (item) => {
    return function loginThunkApi() {
      console.log('loginThunkApi')
      console.log(item)
    }
  })