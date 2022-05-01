import { AxiosResponse } from "axios";
import { IComment } from "constants/models/comment.model";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type GetHome = () => Promise<
 AxiosResponse<{ data: IComment[]; meassage: string }>
>;

export const getDashboard: GetHome = () =>
 axiosClient.get(API_ENDPOINT.DASHBOARD.HOME);
