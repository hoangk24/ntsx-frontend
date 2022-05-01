import {AxiosResponse} from "axios";
import {IComment} from "constants/models/comment.model";
import {API_ENDPOINT} from "services/apiEnpoint";
import {axiosClient} from "services/axiosClient";

type IGetComment = (
    id: string
) => Promise<AxiosResponse<{ data: IComment[]; meassage: string }>>;

export const getComment: IGetComment = (id: string) =>
    axiosClient.get(API_ENDPOINT.COMMENT.GET, {params: {id}});
