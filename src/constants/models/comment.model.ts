import { IUser } from "constants/models/auth.model";

export interface IComment {
 _id?: string;
 product: any;
 user: any;
 message: string;
 rate: number;
 reply?: IReplyItem[];
}
export interface IReplyItem {
 idReply?: string;
 user: any;
 message: string;
}
