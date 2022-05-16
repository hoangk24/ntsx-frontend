import { ICartItem } from "constants/models/cart.model";

export interface LoginRequestPayload {
 email: string;
 password: string;
}
export interface ResendMailPayload {
 id: string;
}
export interface CreateEmailPayload {
 idUser: string;
 subject: string;
 title: string;
 message: string;
}
export interface RegisterPayload {
 email: string;
 password: string;
 fullName: string;
}

export interface LogOutRequestPayload {
 cart: ICartItem[];
}
