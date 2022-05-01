import {AxiosResponse} from "axios";
import {IUser} from "constants/models/auth.model";
import {LoginRequestPayload} from "constants/payload/auth.payload";
import {API_ENDPOINT} from "services/apiEnpoint";
import {axiosClient} from "services/axiosClient";
import {IToken} from "constants/models/common.model";

type LoginRequest = (body: LoginRequestPayload) => Promise<AxiosResponse<{
    data: { user: IUser; token: IToken, refreshToken: IToken };
    message: string;
}>>;
type LogOutRequest = (
    body: any
) => Promise<AxiosResponse<{ data: any; message: string }>>;

type NewAccessToken = (
    body: { refreshToken: string }
) => Promise<AxiosResponse<{ data: { token: IToken }; message: string }>>;


export const logIn: LoginRequest = (body) =>
    axiosClient.post(API_ENDPOINT.AUTH.LOGIN, body);
export const logOut: LogOutRequest = (body) =>
    axiosClient.post(API_ENDPOINT.AUTH.LOGOUT, body);
export const getNewAccessToken: NewAccessToken = (body) =>
    axiosClient.post(API_ENDPOINT.AUTH.ACCESS_TOKEN, body);
