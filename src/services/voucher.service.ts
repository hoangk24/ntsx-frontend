import { AxiosResponse } from "axios";
import { IVoucher } from "constants/models/voucher.model";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type GetAllVoucher = () => Promise<
 AxiosResponse<{ data: any; message: string }>
>;
type CreateVoucher = (
 body: IVoucher
) => Promise<AxiosResponse<{ data: IVoucher; message: string }>>;
type UpdateVoucher = (
 id: string,
 body: any
) => Promise<AxiosResponse<{ data: IVoucher; message: string }>>;
type DeleteVoucher = (
 params: any
) => Promise<AxiosResponse<{ data: any; message: string }>>;
export const getVoucher: GetAllVoucher = () =>
 axiosClient.get(API_ENDPOINT.VOUCHER.GET);

export const addVoucher: CreateVoucher = (body) =>
 axiosClient.post(API_ENDPOINT.VOUCHER.CREATE, body);

export const updateVoucher: UpdateVoucher = (id, body) =>
 axiosClient.post(`${API_ENDPOINT.VOUCHER.UPDATE}/${id}`, body);

export const deleteVoucher: DeleteVoucher = (params) =>
 axiosClient.delete(API_ENDPOINT.VOUCHER.DELETE, { params });
