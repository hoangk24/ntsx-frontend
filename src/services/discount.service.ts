import { AxiosResponse } from "axios";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type IGetDiscount = () => Promise<
 AxiosResponse<{ data: any[]; meassage: string }>
>;
type IAddDiscount = (
 body: any
) => Promise<AxiosResponse<{ data: any; meassage: string }>>;
type IApplyDiscount = (
 body: any
) => Promise<AxiosResponse<{ data: any; meassage: string }>>;
type IUpdateDiscount = (
 id: string,
 body: any
) => Promise<AxiosResponse<{ data: any; meassage: string }>>;

export const getDiscount: IGetDiscount = () =>
 axiosClient.get(API_ENDPOINT.DISCOUNT.GET);

export const addDiscount: IAddDiscount = (body) =>
 axiosClient.post(API_ENDPOINT.DISCOUNT.CREATE, body);

export const applyDiscount: IApplyDiscount = (body) =>
 axiosClient.post(API_ENDPOINT.DISCOUNT.APPLY, body);

export const updateDiscount: IUpdateDiscount = (id, body) =>
 axiosClient.post(`${API_ENDPOINT.DISCOUNT.UPDATE}/${id}`, body);
