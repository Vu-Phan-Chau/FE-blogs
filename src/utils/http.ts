import axios, {AxiosRequestHeaders} from "axios";
import {LOCAL_STORAGE} from "./constants";

export const headers = {
  'Authorization': `Bearer ${LOCAL_STORAGE.GET_TOKEN()}`,
  'Content-Type': 'application/json'
};

export const httpService = {
  get: async (url: string, headers: AxiosRequestHeaders) => axios.get(url, { headers }),
  post: async (url: string, body: {}, headers: AxiosRequestHeaders) => axios.post(url, body, { headers })
};