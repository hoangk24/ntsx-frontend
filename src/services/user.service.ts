import { AxiosResponse } from "axios";
import {
 ActiveMailPayload,
 ChangeRolePayload,
 CreateUserRequest,
} from "constants/payload/user.payload";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type GetAllUser = (
 body: any
) => Promise<AxiosResponse<{ data: any; message: string }>>;

type GetUserInfo = (
 id: string
) => Promise<AxiosResponse<{ data: any; message: string }>>;

type CreateUser = (
 body: CreateUserRequest
) => Promise<AxiosResponse<{ data: any; message: string }>>;

type DeleteUser = (
 id: string
) => Promise<AxiosResponse<{ data: any; message: string }>>;
type ChangeRole = (
 body: ChangeRolePayload
) => Promise<AxiosResponse<{ data: any; message: string }>>;
type ActiveMail = (
 body: ActiveMailPayload
) => Promise<AxiosResponse<{ data: any; message: string }>>;

export const getAllUser: GetAllUser = (body) =>
 axiosClient.get(API_ENDPOINT.USER.GET);

export const createUser: CreateUser = (body) =>
 axiosClient.post(API_ENDPOINT.USER.CREATE, body, {
  withCredentials: true,
 });
export const getUserInfo: GetUserInfo = (id) =>
 axiosClient.get(`${API_ENDPOINT.USER.GET_BY_ID}/${id}`, {
  withCredentials: true,
 });

export const deleteUser: DeleteUser = (params) =>
 axiosClient.delete(`${API_ENDPOINT.USER.DELETE}/${params}`);

export const changeRole: ChangeRole = (body) =>
 axiosClient.post(`${API_ENDPOINT.USER.CHANGE_ROLE}/${body.id}`, {
  role: body.role,
 });
export const activeMail: ActiveMail = (body) =>
 axiosClient.post(`${API_ENDPOINT.MAIl.ACTIVE}/${body.id}`, body);
