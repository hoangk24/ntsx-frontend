import { IProduct } from "constants/models/product.model";

export interface IDiscount {
 _id: string;
 name: string;
 percent: number;
 list: IProduct[];
 startDate: Date;
 endDate: Date;
 createdAt: Date;
 updatedAt: Date;
 status: boolean;
}
