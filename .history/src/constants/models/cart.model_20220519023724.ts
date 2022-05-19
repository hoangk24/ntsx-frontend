import { IImage } from "./common.model";
import { IProduct } from "./product.model";

export interface ICart {
 _id: string;
 user: any;
 list: ICartItemPreview[] | ICartItem[];
 status: CartStatus;
 address: string;
 phoneNumber: string;
 fullName: string;
 totalQuantity: number;
 totalCost: number;
 discount: number;
 finalCost: number;
 createdAt: Date;
 updatedAt: Date;
 isPaided: boolean;
 isDisabled: boolean;
 isCommented: boolean;
 payment?: string;
}

export enum CartStatus {
 "CANCLE" = 0,
 "CREATING" = 1,
 "CONFIRM" = 2,
 "SHIPPING" = 3,
 "DONE" = 4,
}

export interface ICartItemPreview {
 idProduct: string;
 size: number;
 quantity: number;
 cost: number;
 price: number;
 posters: IImage[];
 discount: number;
 maxSize: number;
 name: string;
}

export interface ICartItem {
 idProduct: any;
 size: any;
 quantity: number;
}
