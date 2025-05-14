import { CategoryType } from "./categoryType";

export interface ProductType {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    category: CategoryType;
}