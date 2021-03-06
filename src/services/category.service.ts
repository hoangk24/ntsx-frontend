import { AxiosResponse } from "axios";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient, configUpload } from "services/axiosClient";

type GetCategoryRequest = () => Promise<AxiosResponse<any>>;
type DeleteCategory = (params: {
 id: string;
}) => Promise<AxiosResponse<any>>;
type DeleteNsx = (params: {
 nsx: string;
 category: string;
}) => Promise<AxiosResponse<any>>;
type AddCategory = (body: any) => Promise<AxiosResponse<any>>;
type UpdateCategory = (
 id: string,
 data: any
) => Promise<AxiosResponse<any>>;
type AddSubcategory = (body: any) => Promise<AxiosResponse<any>>;

export const getCategory: GetCategoryRequest = () =>
 axiosClient.get(API_ENDPOINT.CATEGORY.GET);

export const addSubcategory: AddSubcategory = (body) => {
 return axiosClient.post(API_ENDPOINT.SUB_CATEGORY.CREATE, body);
};
export const addCategory: AddCategory = (body) =>
 axiosClient.post(API_ENDPOINT.CATEGORY.CREATE, body, {
  ...configUpload,
 });
export const updateCategory: UpdateCategory = (id, data) =>
 axiosClient.post(`${API_ENDPOINT.CATEGORY.UPDATE}/${id}`, data, {
  ...configUpload,
 });
export const deleteCategory: DeleteCategory = (params) =>
 axiosClient.delete(API_ENDPOINT.CATEGORY.DELETE, { params });
export const deleteNsx: DeleteNsx = (params) =>
 axiosClient.delete(API_ENDPOINT.CATEGORY.DELETE_NSX, { params });
