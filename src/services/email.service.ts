import { AxiosResponse } from "axios";
import {
 CreateEmailPayload,
 ResendMailPayload,
} from "constants/payload/auth.payload";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type ResendMailRequest = (
 body: ResendMailPayload
) => Promise<AxiosResponse<{ data: any; message: string }>>;
type VerfiedEmailRequest = (body: {
 token: string;
}) => Promise<AxiosResponse<{ data: any; message: string }>>;

type CreateMailRequest = (
 body: CreateEmailPayload
) => Promise<AxiosResponse<{ data: any; message: string }>>;

export const re_verifiedMail: ResendMailRequest = (body) =>
 axiosClient.post(API_ENDPOINT.MAIl.RE_VERIFIED, body);

export const create_mail: CreateMailRequest = (body) =>
 axiosClient.post(API_ENDPOINT.MAIl.CREATE, body);
export const verified: VerfiedEmailRequest = (body) =>
 axiosClient.post(API_ENDPOINT.MAIl.VERIFIED, body);
