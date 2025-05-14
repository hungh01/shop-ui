import { ProductType } from "../product/productType";

export interface CartItem {
    products: {
        product: ProductType;
        quantity: number;
    }[];
    totalPrice: number;
}