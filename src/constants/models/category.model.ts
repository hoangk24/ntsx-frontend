import { IImage } from "constants/models/common.model";

export interface ICategory {
 _id: string;
 name: string;
 path: string;
 logos: IImage;
 subCategory: ISubCategory[];
}

export interface ISubCategory {
 _id?: string;
 name: string;
 path: string;
}
