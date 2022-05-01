import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "services/apiEnpoint";
import qs from "query-string";
import { getNewAccessToken } from "./auth.service";
import { useNavigate } from "react-router-dom";
export const axiosClient = axios.create({
 baseURL: BASE_URL,
 headers: {
  "Content-Type": "application/json",
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
    return (window.location.href = "/login");
   }
  }

  return Promise.reject(error);
 }
);
