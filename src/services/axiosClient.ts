import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import qs from "query-string";
import { BASE_URL } from "services/apiEnpoint";
import { getNewAccessToken } from "./auth.service";
export const axiosClient = axios.create({
 baseURL: BASE_URL,
 headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://ntsxshop.netlify.app",
 },
 paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use(
 async (config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  (config?.headers as any).Authorization = `Bearer ${token}`;
  return config;
 }
);
axiosClient.interceptors.response.use(
 (response) => {
  return response;
 },
 async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
   originalRequest._retry = true;
   try {
    const refreshToken = localStorage.getItem("refreshToken");
    const access_token = await getNewAccessToken({
     refreshToken,
    } as any);
    axios.defaults.headers.common["Authorization"] =
     "Bearer " + access_token.data.data.token.token;
    return axiosClient(originalRequest);
   } catch (error) {
    localStorage.clear();
    message.error("Hết hạn đăng nhập vui lòng đăng nhập lại!");
    return (window.location.href = "/login");
   }
  }

  return Promise.reject(error);
 }
);

export const configUpload = {
 headers: {
  "content-type": "multipart/form-data",
 },
};
