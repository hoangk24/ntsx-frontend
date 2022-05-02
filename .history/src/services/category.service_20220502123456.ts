import { AxiosResponse } from "axios";
import { API_ENDPOINT } from "services/apiEnpoint";
import { axiosClient, configUpload } from "services/axiosClient";

type GetCategoryRequest = () => Promise<AxiosResponse<any>>;
type AddCategory = (body: any) => Promise<AxiosResponse<any>>;
type AddSubcategory = (body: any) => Promise<AxiosResponse<any>>;

export const getCategory: GetCategoryRequest = () =>
 axiosClient.get(API_ENDPOINT.CATEGORY.GET);

export const addSubcategory: AddSubcategory = (body) =>
 axiosClient.post(API_ENDPOINT.SUB_CATEGORY.CREATE, body, {
  ...configUpload,
 });
export const addCategory: AddCategory = (body) =>
 axiosClient.post(API_ENDPOINT.CATEGORY.CREATE, body, {
  ...configUpload,
 });
