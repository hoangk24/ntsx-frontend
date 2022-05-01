import { ISizes } from "constants/models/product.model";

export interface CreateProductPayload {
 name: string;
 price: number;
 size: ISizes[];
 category: string;
 nsx: string;
 note: string;
}
