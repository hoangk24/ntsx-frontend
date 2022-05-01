import {
 CartStatus,
 ICartItemPreview,
} from "constants/models/cart.model";

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
}

export interface ChangeStatusRequest {
 id: string;
 status: CartStatus;
}
