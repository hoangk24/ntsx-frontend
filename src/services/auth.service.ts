import { AxiosResponse } from "axios";
import { IUser } from "constants/models/auth.model";
import {
 LoginRequestPayload,
 LogOutRequestPayload,
 RegisterPayload,
} from "constants/payload/auth.payload";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";
import { IToken } from "constants/models/common.model";

type LoginRequest = (body: LoginRequestPayload) => Promise<
 AxiosResponse<{
  data: { user: IUser; token: IToken; refreshToken: IToken };
  message: string;
 }>
>;
type RegisterRequest = (body: RegisterPayload) => Promise<
 AxiosResponse<{
  data: RegisterPayload;
  message: string;
 }>
>;
type LogOutRequest = (
 body: LogOutRequestPayload
) => Promise<AxiosResponse<{ data: any; message: string }>>;

type NewAccessToken = (params: {
 refreshToken: string;
}) => Promise<
 AxiosResponse<{ data: { token: IToken }; message: string }>
>;

export const logIn: LoginRequest = (body) =>
 axiosClient.post(API_ENDPOINT.AUTH.LOGIN, body);

export const register: RegisterRequest = (body) =>
 axiosClient.post(API_ENDPOINT.AUTH.REGISTER, body);

export const getNewAccessToken: NewAccessToken = (params) =>
 axiosClient.get(API_ENDPOINT.AUTH.ACCESS_TOKEN, { params });

export const logOut: LogOutRequest = (body) =>
 axiosClient.post(API_ENDPOINT.AUTH.LOGOUT, body);
