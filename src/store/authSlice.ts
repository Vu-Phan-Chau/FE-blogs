import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {API_SERVICES, LOCAL_STORAGE} from "../utils/constants";
import {httpService} from "../utils/http";
import {loginTypes, registerTypes} from "../utils/types";

const initialState = {
  isLoading: false as boolean,
  isHiddenModel: false as boolean
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<loginTypes>) => {
      const body = {
        email: payload.email,
        password: payload.password
      };
      httpService.post(API_SERVICES.AUTH_LOGIN, body, {})
        .then(res => {
          if (res.data.success) {
            LOCAL_STORAGE.SET_TOKEN(res.data.accessToken);
            LOCAL_STORAGE.SET_IS_LOGIN(JSON.stringify(true));
            window.location.href = '/';
          }
        }).catch(error => {
          console.log(error)
        })
    },
    register: (state, { payload }: PayloadAction<registerTypes>) => {
      const body = {
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        address: payload.address
      };
      httpService.post(API_SERVICES.AUTH_REGISTER, body, {})
        .then(res => {
          window.location.href = '/auth/login';
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleModel: (state, { payload }: PayloadAction<boolean>) => {
      state.isHiddenModel = payload
    }
  }
});

export const { login, register, handleModel } = authSlice.actions;
export default authSlice.reducer;
