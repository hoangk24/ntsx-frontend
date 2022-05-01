import { AxiosResponse } from "axios";
import { ICart } from "constants/models/cart.model";
import {
 ChangeStatusRequest,
 CreateCartRequest,
} from "constants/payload/cart.payload";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient } from "services/axiosClient";

type IGetPreview = (body: any) => Promise<AxiosResponse<any>>;
type IGetCartUser = (params: any) => Promise<AxiosResponse<any>>;
type IGetAlltCart = () => Promise<AxiosResponse<any>>;
type ICheckVoucher = (
 params: any
) => Promise<AxiosResponse<{ data: any; message: string }>>;
type ICreateCart = (
 body: CreateCartRequest
) => Promise<AxiosResponse<{ data: ICart; message: string }>>;

type IChangeStatus = (
 body: ChangeStatusRequest
) => Promise<AxiosResponse<{ data: any; message: string }>>;

export const changeStatus: IChangeStatus = (body) =>
 axiosClient.post(API_ENDPOINT.CART.CHANGE_STATUS, body);

export const getPreview: IGetPreview = (body: any) =>
 axiosClient.post(API_ENDPOINT.CART.GET_CART_PREVIEW, body);

export const getCartUser: IGetCartUser = (params) =>
 axiosClient.get(API_ENDPOINT.CART.GET_CART, { params });

export const checkVoucher: ICheckVoucher = (params) =>
 axiosClient.get(API_ENDPOINT.CART.CHECK_VOUCHER, { params });

export const createCart: ICreateCart = (body) =>
 axiosClient.post(API_ENDPOINT.CART.CREATE, body);

export const getAllCart: IGetAlltCart = () =>
 axiosClient.get(API_ENDPOINT.CART.GET_ALL_CART);
