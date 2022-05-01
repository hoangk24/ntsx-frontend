import {AxiosResponse} from "axios";
import {ICity, IDistrict, IWard,} from "constants/models/province.mode";
import {API_ENDPOINT} from "services/apiEnpoint";
import {axiosClient} from "services/axiosClient";

type IGetCity = () => Promise<AxiosResponse<{ result: ICity[] }>>;
type IGetDistrict = (
    id: string
) => Promise<AxiosResponse<{ result: IDistrict[] }>>;
type IGetWard = (
    id: string
) => Promise<AxiosResponse<{ result: IWard[] }>>;

export const getCity: IGetCity = () =>
    axiosClient.get(API_ENDPOINT.PROVINCE.CITY);

export const getDistrict: IGetDistrict = (id: string) =>
    axiosClient.get(`${API_ENDPOINT.PROVINCE.DISTRICT}/${id}`);

export const getWard: IGetWard = (id: string) =>
    axiosClient.get(`${API_ENDPOINT.PROVINCE.WARD}/${id}`);
