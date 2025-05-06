import { ProductType } from "./productType";

export interface ProductCategoryType {
    id: string;
    name: string;
    products: ProductType[];
}