import {AxiosResponse} from "axios";
import {API_ENDPOINT} from "services/apiEnpoint";
import {axiosClient} from "services/axiosClient";

type GetCategoryRequest = () => Promise<AxiosResponse<any>>;

export const getCategory: GetCategoryRequest = () =>
    axiosClient.get(API_ENDPOINT.CATEGORY.GET);
