import { AxiosResponse } from "axios";
import { IProduct } from "constants/models/product.model";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient, configUpload } from "services/axiosClient";

type GetProduct = () => Promise<
 AxiosResponse<{ data: IProduct[]; message: string }>
>;
type GetProductByCategory = (
 path: string
) => Promise<AxiosResponse<{ data: IProduct[]; message: string }>>;
type GetProductByNsx = (
 path: string
) => Promise<AxiosResponse<{ data: IProduct[]; message: string }>>;

type GetProductDetail = (
 id: string
) => Promise<AxiosResponse<{ data: IProduct; message: string }>>;
type DeleteProduct = (params: {
 id: string;
}) => Promise<AxiosResponse<{ data: IProduct; message: string }>>;
type AddProductRequest = (
 body: any
) => Promise<AxiosResponse<{ data: IProduct; message: string }>>;
type UpdateProductRequest = (body: {
 id: string;
 data: Partial<IProduct>;
}) => Promise<AxiosResponse<{ data: IProduct; message: string }>>;

export const getProduct: GetProduct = () =>
 axiosClient.get(API_ENDPOINT.PRODUCT.GET_ALL);
export const getProductByCategory: GetProductByCategory = (path) =>
 axiosClient.get(`${API_ENDPOINT.CATEGORY.GET_PRODUCT}/${path}`);

export const getProductByNsx: GetProductByNsx = (path) =>
 axiosClient.get(`${API_ENDPOINT.SUB_CATEGORY.GET_PRODUCT}/${path}`);

export const getProductDetail: GetProductDetail = (id) =>
 axiosClient.get(`${API_ENDPOINT.PRODUCT.GET_DETAIL}/${id}`);

export const deleteProduct: DeleteProduct = (params) =>
 axiosClient.delete(API_ENDPOINT.PRODUCT.DELETE, { params });

export const addProduct: AddProductRequest = (body) =>
 axiosClient.post(API_ENDPOINT.PRODUCT.CREATE, body, {
  ...configUpload,
 });

export const updateProduct: UpdateProductRequest = (body) =>
 axiosClient.post(
  `${API_ENDPOINT.PRODUCT.UPDATE}/${body.id}`,
  body.data
 );
