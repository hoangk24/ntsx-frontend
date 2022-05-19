import {
 CartStatus,
 ICartItemPreview,
} from "constants/models/cart.model";
import { IComment } from "constants/models/comment.model";

export interface CreateCartRequest {
 user: string;
 address: string;
 fullName: string;
 phoneNumber: string;
 list: ICartItemPreview[];
 status: CartStatus;
 totalCost: number;
 totalQuantity: number;
 discount: number;
 finalCost: number;
 isPaided: boolean;
 payment: string;
}

export interface ChangeStatusRequest {
 id: string;
 status: CartStatus;
}
export interface CreateCommentPayload {
 cartId: string;
 comment: IComment;
}
