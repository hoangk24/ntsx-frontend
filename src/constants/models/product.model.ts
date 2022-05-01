import { ICategory } from "constants/models/category.model";
import { IImage } from "constants/models/common.model";

export interface IProduct {
 _id: string;
 name: string;
 price: number;
 size: ISizes[];
 posters: IImage[];
 discount: number;
 nsx: INSX;
 comment: any[];
 category: ICategory;
 note: string;
 rate: {
  terribly: number;
  bad: number;
  normal: number;
  good: number;
  well: number;
 };
}

export const rateName = [
 "terrible",
 "bad",
 "normal",
 "good",
 "wonderful",
];
export interface INSX {
 _id: string;
 name?: string;
 path?: string;
 createdAt?: Date;
 updatedAt?: Date;
}

export interface ISizes {
 size: number | string;
 quantity: number;
}
