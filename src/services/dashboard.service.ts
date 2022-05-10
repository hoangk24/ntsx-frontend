import { AxiosResponse } from "axios";
import { IComment } from "constants/models/comment.model";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type GetHome = (
 body?: any
) => Promise<AxiosResponse<{ data: IComment[]; meassage: string }>>;

export const getDashboard: GetHome = (body?: any) =>
 axiosClient.post(API_ENDPOINT.DASHBOARD.HOME, body);
